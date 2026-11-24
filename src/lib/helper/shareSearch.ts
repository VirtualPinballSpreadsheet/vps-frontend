import { get } from 'svelte/store';
import { Search } from '$lib/stores/SearchStore';
import { modeMapping } from './modeMapping';
import { sortOptions, type Mode, type SortBy } from '$lib/types/Filter';

// ---------------------------------------------------------------------------
// Shareable search links
//
// The search state (query, mode, sort, filters) lives in Svelte stores and is
// not part of the URL. To make a search shareable we serialize it into
// readable query params and copy the full URL to the clipboard. On load, if
// the URL carries those params, the state is imported once and the URL is
// cleaned up again. One-shot in both directions — no continuous sync, no
// loops.
// ---------------------------------------------------------------------------

// Readable param names — self-documenting when shared in a forum or chat.
// Deliberately distinct from the modal params (game / fileId / edit).
const PARAMS = {
	query: 'query',
	sort: 'sort',
	year: 'year',
	players: 'players',
	manufacturer: 'manufacturer',
	features: 'features',
	theme: 'theme',
	author: 'author',
	designers: 'designers'
} as const;

const KNOWN_PARAMS = new Set<string>(Object.values(PARAMS));

// A snapshot of the search state. Inactive filters are null.
export interface ShareState {
	query: string;
	mode: Mode;
	sortBy: SortBy;
	year: [number, number] | null;
	players: [number, number] | null;
	manufacturer: string[] | null;
	features: string[] | null;
	theme: string[] | null;
	author: string[] | null;
	designers: string[] | null;
}

// The sort the app would use by default for this state — omitted from the
// link so links stay clean.
const defaultSort = (query: string): SortBy => (query ? 'search' : 'lastUpdated');

// Serialize a ShareState into URL query params. The mode is NOT included —
// it is carried by the route (see buildShareUrl).
export const shareStateToParams = (s: ShareState): URLSearchParams => {
	const p = new URLSearchParams();
	if (s.query) p.set(PARAMS.query, s.query);
	if (s.sortBy !== defaultSort(s.query)) p.set(PARAMS.sort, s.sortBy);
	if (s.year) p.set(PARAMS.year, s.year.join('-'));
	if (s.players) p.set(PARAMS.players, s.players.join('-'));
	if (s.manufacturer?.length) p.set(PARAMS.manufacturer, s.manufacturer.join(','));
	if (s.features?.length) p.set(PARAMS.features, s.features.join(','));
	if (s.theme?.length) p.set(PARAMS.theme, s.theme.join(','));
	if (s.author?.length) p.set(PARAMS.author, s.author.join(','));
	if (s.designers?.length) p.set(PARAMS.designers, s.designers.join(','));
	return p;
};

const parseList = (v: string | null): string[] | null =>
	v
		? v
				.split(',')
				.map((x) => x.trim())
				.filter(Boolean)
		: null;

const parseRange = (v: string | null): [number, number] | null => {
	if (!v) return null;
	const [a, b] = v.split('-').map(Number);
	return Number.isFinite(a) && Number.isFinite(b) ? [a, b] : null;
};

// Parse URL query params into a ShareState. Returns null when the URL carries
// no known search params (i.e. it is not a share link — e.g. a modal link
// like ?game=...). The mode comes from the route, not the params.
export const paramsToShareState = (params: URLSearchParams, mode: Mode): ShareState | null => {
	let isShareLink = false;
	params.forEach((_, key) => {
		if (KNOWN_PARAMS.has(key)) isShareLink = true;
	});
	if (!isShareLink) return null;

	const query = params.get(PARAMS.query) ?? '';
	const sort = params.get(PARAMS.sort);
	const validSorts = sortOptions.map((o) => o.sortBy);

	return {
		query,
		mode,
		sortBy: sort && (validSorts as string[]).includes(sort) ? (sort as SortBy) : defaultSort(query),
		year: parseRange(params.get(PARAMS.year)),
		players: parseRange(params.get(PARAMS.players)),
		manufacturer: parseList(params.get(PARAMS.manufacturer)),
		features: parseList(params.get(PARAMS.features)),
		theme: parseList(params.get(PARAMS.theme)),
		author: parseList(params.get(PARAMS.author)),
		designers: parseList(params.get(PARAMS.designers))
	};
};

// ---------------------------------------------------------------------------
// Store glue
// ---------------------------------------------------------------------------

// Apply a ShareState to the live Search stores. Order matters: the query
// store has a subscription that flips sortBy between 'search' and
// 'lastUpdated', so the query is set first and the sort last, letting the
// saved sort win.
export const applyShareState = (s: ShareState) => {
	const { year, players, manufacturer, features, theme, author, designers, filterActive } = Search;
	const anyFilter = Boolean(
		s.year || s.players || s.manufacturer || s.features || s.theme || s.author || s.designers
	);
	year.set({ ...get(year), value: s.year ?? get(year).value, active: s.year !== null });
	players.set({
		...get(players),
		value: s.players ?? get(players).value,
		active: s.players !== null
	});
	manufacturer.set({
		...get(manufacturer),
		value: s.manufacturer ?? [],
		active: s.manufacturer !== null
	});
	features.set({ ...get(features), value: s.features ?? [], active: s.features !== null });
	theme.set({ ...get(theme), value: s.theme ?? [], active: s.theme !== null });
	author.set({ ...get(author), value: s.author ?? [], active: s.author !== null });
	designers.set({ ...get(designers), value: s.designers ?? [], active: s.designers !== null });
	filterActive.set(anyFilter);
	Search.query.set(s.query);
	Search.sortBy.set(s.sortBy);
};

// Build the full share URL for a search state. The mode is encoded in the
// route, not in the params.
export const buildShareUrl = (s: ShareState): string => {
	const qs = shareStateToParams(s).toString();
	const base = `${window.location.origin}/${modeMapping[s.mode].route}`;
	return qs ? `${base}?${qs}` : base;
};

// Reverse of modeMapping: '/tables' -> 'tableFiles'.
const routeToMode = (pathname: string): Mode | null => {
	const route = pathname.replace(/^\//, '').split('/')[0];
	const entry = Object.entries(modeMapping).find(([, m]) => m.route === route);
	return entry ? (entry[0] as Mode) : null;
};

// One-shot import: if the current URL is a share link, apply it to the stores
// and clean the URL up so it looks like a normal page. Called once from the
// root layout on mount.
export const importShareLink = () => {
	const params = new URLSearchParams(window.location.search);
	const mode = routeToMode(window.location.pathname) ?? get(Search.mode);
	const state = paramsToShareState(params, mode);
	if (!state) return;
	applyShareState(state);
	history.replaceState(null, '', `/${modeMapping[state.mode].route}`);
};
