import type { Mode } from '$lib/types/Filter';
import type {
	AltColorFile,
	FileUpload,
	FileUrl,
	Game,
	RomFile,
	TableFile,
	TutorialFile,
	WheelArtFile
} from '$lib/types/VPin';
import { B2SFeatures, TableFeatures, fileTypes } from '$lib/types/VPin';
import { getBackglassUrl } from './getBackglassUrl';
import { getURLIcon } from './getURLIcon';

// ---------------------------------------------------------------------------
// Column definitions for the table view.
//
// Each mode gets an ordered, curated list of columns assembled from shared
// factories. A column knows how to produce a plain string/number value from
// a row (used for sorting, and reusable for export); the ResultTable
// component decides how to paint each cell based on `kind`.
//
// Fixed for now, but structured so a future column-visibility picker only
// needs to filter these lists per mode.
// ---------------------------------------------------------------------------

export type CellKind = 'name' | 'text' | 'date' | 'check' | 'links' | 'comment' | 'count';

export interface ColumnDef {
	id: string;
	header: string;
	kind: CellKind;
	// Plain value used for sorting (and future export reuse)
	getValue: (item: any) => string | number | boolean | undefined;
	// Display text for 'name' cells (may differ from the sort value)
	getText?: (item: any) => string;
	// 'name' cells with a picture: hover preview source
	getThumb?: (item: any) => string | undefined;
	// 'links' cells: download/resource links (broken ones are filtered out)
	getLinks?: (item: any) => FileUrl[];
	// Links cells have nothing meaningful to sort by
	sortable?: boolean;
}

// ---------------------------------------------------------------------------
// Value formatting
// ---------------------------------------------------------------------------

// Alphabetical, case-insensitive; returns undefined for empty so the column
// stays "empty" for sorting (empties last).
const sortedList = (values?: string[]): string | undefined =>
	values?.length ? [...values].sort((a, b) => a.localeCompare(b)).join(', ') : undefined;

// Lists with a canonical vocabulary (table/B2S features) sort by canonical
// position; unknown values are appended alphabetically.
const canonicalSortedList = (
	values: string[] | undefined,
	canonical: readonly string[]
): string | undefined => {
	if (!values?.length) return undefined;
	const rank = (v: string) => {
		const i = canonical.indexOf(v);
		return i === -1 ? canonical.length : i;
	};
	return [...values]
		.sort((a, b) => rank(a) - rank(b) || (rank(a) === canonical.length ? a.localeCompare(b) : 0))
		.join(', ');
};

// Download links, minus the broken ones (a dead link is noise in a table).
const usableLinks = (f: FileUpload): FileUrl[] =>
	(f.urls || []).filter((u) => !u.broken && !!u.url);

// Short label for a link cell, e.g. VPU / VPF / GDrive / IPDB / Ext / YT
export const linkLabel = (u: FileUrl): string => {
	if (/youtu\.be|youtube\.com/.test(u.url)) return 'YT';
	if (/ipdb\.org/.test(u.url)) return 'IPDB';
	return getURLIcon(u).title;
};

// ---------------------------------------------------------------------------
// Factories for the columns shared across modes
// ---------------------------------------------------------------------------

const fileUpdated = (f: FileUpload) => f.createdAt ?? f.updatedAt;

const colAuthors = (): ColumnDef => ({
	id: 'authors',
	header: 'Authors',
	kind: 'text',
	getValue: (f: FileUpload) => f.authors?.join(', ')
});

const colVersion = (): ColumnDef => ({
	id: 'version',
	header: 'Version',
	kind: 'text',
	getValue: (f: FileUpload) => f.version
});

const colUpdated = (): ColumnDef => ({
	id: 'updated',
	header: 'Updated',
	kind: 'date',
	getValue: (f: FileUpload) => fileUpdated(f)
});

const colFeatures = (canonical: readonly string[]): ColumnDef => ({
	id: 'features',
	header: 'Features',
	kind: 'text',
	getValue: (f: TableFile) => canonicalSortedList(f.features, canonical)
});

const colLinks = (): ColumnDef => ({
	id: 'links',
	header: 'Links',
	kind: 'links',
	sortable: false,
	// no sort value: the cell is a set of links, not data
	getValue: () => undefined,
	getLinks: (f: FileUpload) => usableLinks(f)
});

// Files often carry a short author's note; shown as a hover glyph rather
// than a text column so it only costs attention when present.
const colComment = (): ColumnDef => ({
	id: 'comment',
	header: 'Note',
	kind: 'comment',
	sortable: false,
	getValue: (f: FileUpload) => f.comment
});

// Wheel-art notes are short and usually the whole point of the row
// (animated variants, author instructions), so show them inline.
const colCommentText = (): ColumnDef => ({
	id: 'comment',
	header: 'Note',
	kind: 'text',
	sortable: false,
	getValue: (f: FileUpload) => f.comment
});

// Tutorials keep their source in youtubeId/url rather than the FileUpload
// urls array, so they need their own links column.
const tutorialUrls = (t: TutorialFile): FileUrl[] => {
	const urls: FileUrl[] = [];
	if (t.youtubeId) urls.push({ url: `https://www.youtube.com/watch?v=${t.youtubeId}` });
	if (t.url) urls.push({ url: t.url });
	return urls;
};

const colTutorialLinks = (): ColumnDef => ({
	id: 'links',
	header: 'Links',
	kind: 'links',
	sortable: false,
	getValue: () => undefined,
	getLinks: (t: TutorialFile) => tutorialUrls(t)
});

// Plain game-name column (no picture) for the simpler file modes
const colGame = (): ColumnDef => ({
	id: 'game',
	header: 'Game',
	kind: 'text',
	getValue: (f: FileUpload) => f.game?.name
});

const gameFormats = (g: Game): string =>
	Array.from(new Set((g.tableFiles || []).map((t) => t.tableFormat).filter((f) => !!f)))
		.sort()
		.join(', ');

// Short headers for the per-fileType count columns in the games view
// (one per fileTypes entry; Game mirrors FileUpload[] on every key).
const countHeaders: Record<(typeof fileTypes)[number], string> = {
	tableFiles: 'Tables',
	povFiles: 'PoV',
	b2sFiles: 'B2S',
	romFiles: 'ROMs',
	altColorFiles: 'Colors',
	altSoundFiles: 'Sounds',
	pupPackFiles: 'PuP',
	wheelArtFiles: 'Wheel',
	topperFiles: 'Tops',
	mediaPackFiles: 'Media',
	ruleFiles: 'Rules',
	tutorialFiles: 'Vids'
};

// Counts sort numerically; zero is a real value (not "empty"), so sorting
// ascending puts e.g. "games with no wheel art" first.
const colCounts = (): ColumnDef[] =>
	fileTypes.map((key) => ({
		id: `count-${key}`,
		header: countHeaders[key],
		kind: 'count' as CellKind,
		getValue: (g: Game) => (g[key] as FileUpload[] | undefined)?.length ?? 0
	}));

// ---------------------------------------------------------------------------
// Per-mode column lists
// ---------------------------------------------------------------------------

// The simple file modes (PuP packs, POV, toppers, ...) all show the same set
const sharedFileColumns = (): ColumnDef[] => [
	colGame(),
	colVersion(),
	colAuthors(),
	colComment(),
	colLinks(),
	colUpdated()
];

export const modeColumns: { [key in Mode]: ColumnDef[] } = {
	game: [
		{
			id: 'name',
			header: 'Name',
			kind: 'name',
			getValue: (g: Game) => g.name,
			getThumb: (g: Game) => getBackglassUrl(g)
		},
		{
			id: 'manufacturer',
			header: 'Manufacturer',
			kind: 'text',
			getValue: (g: Game) => g.manufacturer
		},
		{ id: 'year', header: 'Year', kind: 'text', getValue: (g: Game) => g.year },
		{ id: 'type', header: 'Type', kind: 'text', getValue: (g: Game) => g.type },
		{ id: 'players', header: 'Players', kind: 'text', getValue: (g: Game) => g.players },
		{
			id: 'designers',
			header: 'Designers',
			kind: 'text',
			getValue: (g: Game) => g.designers?.join(', ')
		},
		{ id: 'themes', header: 'Themes', kind: 'text', getValue: (g: Game) => sortedList(g.theme) },
		{ id: 'formats', header: 'Formats', kind: 'text', getValue: gameFormats },
		{
			id: 'links',
			header: 'Links',
			kind: 'links',
			sortable: false,
			getValue: () => undefined,
			getLinks: (g: Game) => (g.ipdbUrl ? [{ url: g.ipdbUrl }] : [])
		},
		{
			id: 'updated',
			header: 'Updated',
			kind: 'date',
			getValue: (g: Game) => g.lastCreatedAt ?? g.updatedAt
		},
		...colCounts()
	],
	tableFiles: [
		{
			id: 'name',
			header: 'Game',
			kind: 'name',
			getValue: (f: TableFile) => f.game?.name,
			getText: (f: TableFile) => f.game?.name ?? '',
			getThumb: (f: TableFile) => f.imgUrl
		},
		{ id: 'edition', header: 'Edition', kind: 'text', getValue: (f: TableFile) => f.edition },
		{ id: 'format', header: 'Format', kind: 'text', getValue: (f: TableFile) => f.tableFormat },
		colAuthors(),
		colVersion(),
		colFeatures(TableFeatures),
		colComment(),
		colLinks(),
		colUpdated()
	],
	b2sFiles: [
		{
			id: 'name',
			header: 'Game',
			kind: 'name',
			getValue: (f: FileUpload) => f.game?.name,
			getThumb: (f: FileUpload) => f.imgUrl
		},
		colAuthors(),
		colFeatures(B2SFeatures),
		colComment(),
		colLinks(),
		colUpdated()
	],
	romFiles: [
		colGame(),
		{ id: 'fileName', header: 'File', kind: 'text', getValue: (f: RomFile) => f.fileName },
		{ id: 'colored', header: 'Colored', kind: 'check', getValue: (f: RomFile) => f.colored },
		colAuthors(),
		colVersion(),
		colComment(),
		colLinks(),
		colUpdated()
	],
	altColorFiles: [
		colGame(),
		{ id: 'type', header: 'Type', kind: 'text', getValue: (f: AltColorFile) => f.type },
		colAuthors(),
		colVersion(),
		colComment(),
		colLinks(),
		colUpdated()
	],
	wheelArtFiles: [
		colGame(),
		{
			id: 'animated',
			header: 'Animated',
			kind: 'check',
			getValue: (f: WheelArtFile) => f.animated
		},
		colAuthors(),
		colVersion(),
		colCommentText(),
		colLinks(),
		colUpdated()
	],
	tutorialFiles: [
		{
			id: 'title',
			header: 'Title',
			kind: 'text',
			getValue: (t: TutorialFile) => t.title
		},
		{
			id: 'authors',
			header: 'Authors',
			kind: 'text',
			getValue: (t: TutorialFile) => t.authors?.join(', ')
		},
		{ id: 'updated', header: 'Updated', kind: 'date', getValue: (t: TutorialFile) => t.updatedAt },
		colTutorialLinks()
	],
	pupPackFiles: sharedFileColumns(),
	altSoundFiles: sharedFileColumns(),
	topperFiles: sharedFileColumns(),
	povFiles: sharedFileColumns(),
	mediaPackFiles: sharedFileColumns(),
	ruleFiles: sharedFileColumns()
};

export const getColumns = (mode: Mode): ColumnDef[] => modeColumns[mode];

// ---------------------------------------------------------------------------
// Local table sorting
//
// Sorts within the current result set without disturbing the global sort
// (which keeps governing the grid and the table's default order). Empty
// values sort last regardless of direction.
// ---------------------------------------------------------------------------

export interface SortState {
	colId: string;
	dir: 'asc' | 'desc';
}

const isEmpty = (v: string | number | boolean | undefined): boolean =>
	v === undefined || v === null || v === '';

export const sortRows = (rows: any[], columns: ColumnDef[], sort: SortState | null): any[] => {
	if (!sort) return rows;
	const col = columns.find((c) => c.id === sort.colId);
	if (!col) return rows;
	const mul = sort.dir === 'asc' ? 1 : -1;
	// Array.sort is stable, so ties keep the incoming (global) order
	return [...rows].sort((a, b) => {
		const va = col.getValue(a);
		const vb = col.getValue(b);
		const ea = isEmpty(va);
		const eb = isEmpty(vb);
		if (ea && eb) return 0;
		if (ea) return 1;
		if (eb) return -1;
		if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * mul;
		return String(va).localeCompare(String(vb), undefined, { numeric: true }) * mul;
	});
};

// ---------------------------------------------------------------------------
// Pagination (perPage <= 0 means "all")
// ---------------------------------------------------------------------------

export const pageCount = (total: number, perPage: number): number =>
	perPage <= 0 ? 1 : Math.max(1, Math.ceil(total / perPage));

export const clampPage = (page: number, total: number, perPage: number): number =>
	Math.min(Math.max(1, page), pageCount(total, perPage));

export const pageSlice = (rows: any[], page: number, perPage: number): any[] =>
	perPage <= 0 ? rows : rows.slice((page - 1) * perPage, page * perPage);

const commas = (n: number): string => n.toLocaleString('en-US');

// "1–100 of 3,482" (or "No results")
export const rangeLabel = (total: number, page: number, perPage: number): string => {
	if (!total) return 'No results';
	if (perPage <= 0) return `all ${commas(total)}`;
	const start = (page - 1) * perPage + 1;
	const end = Math.min(total, page * perPage);
	return `${commas(start)}–${commas(end)} of ${commas(total)}`;
};
