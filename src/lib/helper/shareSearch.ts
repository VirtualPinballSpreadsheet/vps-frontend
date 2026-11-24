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
	firstAuthor: 'firstAuthor',
	designers: 'designers'
} as const;

const KNOWN_PARAMS = new Set<string>(Object.values(PARAMS));

// A selected-values filter, optionally negated ("Exclude"). When negated the
// list is encoded with a leading '!', e.g. manufacturer=!Bally,Williams.
export interface ShareListFilter {
	values: string[];
	negate: boolean;
}

// Author filter adds the "first author only" flag (match just the head of
// each file's author chain). Encoded as a firstAuthor=true flag param.
export interface ShareAuthorFilter extends ShareListFilter {
	firstOnly: boolean;
}

// A snapshot of the search state. Inactive filters are null.
export interface ShareState {
	query: string;
	mode: Mode;
	sortBy: SortBy;
	year: [number, number] | null;
	players: [number, number] | null;
	manufacturer: ShareListFilter | null;
	features: ShareListFilter | null;
	theme: ShareListFilter | null;
	author: ShareAuthorFilter | null;
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
	// Negated lists carry a leading '!', e.g. manufacturer=!Bally,Williams
	const putList = (key: string, f: ShareListFilter | null) => {
		if (f?.values.length) p.set(key, (f.negate ? '!' : '') + f.values.join(','));
	};
	putList(PARAMS.manufacturer, s.manufacturer);
	putList(PARAMS.features, s.features);
	putList(PARAMS.theme, s.theme);
	putList(PARAMS.author, s.author);
	// the firstAuthor flag only makes sense alongside an active author filter
	if (s.author?.values.length && s.author.firstOnly) p.set(PARAMS.firstAuthor, 'true');
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

// Parse a '!' prefixed comma list into a ShareListFilter (null when empty).
const parseListFilter = (v: string | null): ShareListFilter | null => {
	if (!v) return null;
	const negate = v.startsWith('!');
	const values = (negate ? v.slice(1) : v)
		.split(',')
		.map((x) => x.trim())
		.filter(Boolean);
	return values.length ? { values, negate } : null;
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
	const authorFilter = parseListFilter(params.get(PARAMS.author));

	return {
		query,
		mode,
		sortBy: sort && (validSorts as string[]).includes(sort) ? (sort as SortBy) : defaultSort(query),
		year: parseRange(params.get(PARAMS.year)),
		players: parseRange(params.get(PARAMS.players)),
		manufacturer: parseListFilter(params.get(PARAMS.manufacturer)),
		features: parseListFilter(params.get(PARAMS.features)),
		theme: parseListFilter(params.get(PARAMS.theme)),
		author: authorFilter
			? { ...authorFilter, firstOnly: params.get(PARAMS.firstAuthor) === 'true' }
			: null,
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
	const applyList = (store: typeof manufacturer, f: ShareListFilter | null, firstOnly?: boolean) =>
		store.set({
			...get(store),
			value: f?.values ?? [],
			negate: f?.negate ?? false,
			...(firstOnly !== undefined ? { firstOnly } : {}),
			active: Boolean(f?.values.length)
		});
	applyList(manufacturer, s.manufacturer);
	applyList(features, s.features);
	applyList(theme, s.theme);
	applyList(author, s.author, s.author?.firstOnly ?? false);
	designers.set({ ...get(designers), value: s.designers ?? [], active: s.designers !== null });
	filterActive.set(anyFilter);
	Search.query.set(s.query);
	Search.sortBy.set(s.sortBy);
};

// URLSearchParams escapes characters that are actually legal in a query
// string, which makes shared links noisy: '!' (the negation marker) becomes
// %21 and ',' (the list separator) becomes %2C. Un-escape them for display;
// the parse side decodes either form. Safe against user input because a
// literal '%21'/'%2C' typed in a search is double-encoded to %2521/%252C.
const prettyQuery = (qs: string): string => qs.replaceAll('%21', '!').replaceAll('%2C', ',');

// Build the full share URL for a search state. The mode is encoded in the
// route, not in the params.
export const buildShareUrl = (s: ShareState): string => {
	const qs = shareStateToParams(s).toString();
	const base = `${window.location.origin}/${modeMapping[s.mode].route}`;
	return qs ? `${base}?${prettyQuery(qs)}` : base;
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
