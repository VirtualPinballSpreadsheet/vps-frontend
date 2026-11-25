import { nanoid } from 'nanoid';
import type { fileTypes, FileUpload, Game } from '$lib/types/VPin';
import type { ReportAction, ReportDate, ScraperKind } from '$lib/types/Scraper';
import { getUrl } from './getUrl';
import { urlsMatch } from './directSearch';

export type FileTypeKey = (typeof fileTypes)[number];

/** scraper GameResourceKind → the `Game` array it belongs in */
export const kindToFileType: Partial<Record<ScraperKind, FileTypeKey>> = {
	table: 'tableFiles',
	b2s: 'b2sFiles',
	tutorial: 'tutorialFiles',
	rom: 'romFiles',
	pupPack: 'pupPackFiles',
	altColor: 'altColorFiles',
	altSound: 'altSoundFiles',
	pov: 'povFiles',
	wheelArt: 'wheelArtFiles',
	topper: 'topperFiles',
	mediaPack: 'mediaPackFiles',
	rule: 'ruleFiles'
};

/** same order the scraper reports its scans in */
const kindOrder: ScraperKind[] = [
	'table',
	'b2s',
	'tutorial',
	'rom',
	'pupPack',
	'altColor',
	'altSound',
	'pov',
	'wheelArt',
	'topper',
	'mediaPack',
	'rule'
];

export const sortKinds = (kinds: ScraperKind[]): ScraperKind[] =>
	[...kinds].sort((a, b) => kindOrder.indexOf(a) - kindOrder.indexOf(b));

// Swift Date.timeIntervalSinceReferenceDate: seconds since 2001-01-01
const CF_ABSOLUTE_TIME_OFFSET = 978307200; // seconds between 1970-01-01 and 2001-01-01

/**
 * Report dates are epoch ms. Reports serialized before the scraper fix
 * contain seconds-since-2001 (CFAbsoluteTime); anything too small to be
 * epoch ms is converted.
 */
export const resolveDate = (date?: ReportDate): number | undefined => {
	if (date && typeof date === 'object' && 'date' in date) {
		const t = date.date._0;
		return t >= 1e11 ? t : (t + CF_ABSOLUTE_TIME_OFFSET) * 1000;
	}
	return undefined;
};

/** the report's detail.date, or now when missing/undated */
export const actionDate = (action: ReportAction): number =>
	resolveDate(action.detail.date) ?? new Date().getTime();

export const vkey = (action: ReportAction): string =>
	`${action.kind}|${action.detail.normalizedURL}`;

export const gameLabel = (game?: Game): string => {
	if (!game) return '???';
	const suffix = [game.manufacturer, game.year && `(${game.year})`].filter(Boolean).join(' ');
	return suffix ? `${game.name} ${suffix}` : game.name;
};

/** the DB file an update action refers to: id first, then URL */
export const findUpdateTarget = (game: Game, action: ReportAction): FileUpload | undefined => {
	const key = kindToFileType[action.kind];
	if (!key) return undefined;
	const files = (game[key] as FileUpload[] | undefined) ?? [];
	const byId = action.id ? files.find((f) => f.id === action.id) : undefined;
	return (
		byId ??
		files.find((f) => {
			const u = getUrl(f.urls);
			return u && urlsMatch(action.detail.normalizedURL, u);
		})
	);
};

/** deep clone of Action.file, re-identified and pointed at the real game */
export const makeSeedFile = (action: ReportAction, game: Game): FileUpload => {
	const file = structuredClone(action.file) as FileUpload;
	file.id = nanoid(10);
	file.game = { id: game.id, name: game.name };
	if (!file.updatedAt) file.updatedAt = new Date().getTime();
	return file;
};

/** existing files of the same kind whose first author matches the disclosure */
export const sameFirstAuthor = (game: Game, action: ReportAction): FileUpload[] => {
	const key = kindToFileType[action.kind];
	if (!key) return [];
	const files = (game[key] as FileUpload[] | undefined) ?? [];
	const seed = (action.file?.authors ?? [])[0];
	if (!seed) return [];
	return files.filter((f) => (f.authors ?? [])[0] === seed);
};
