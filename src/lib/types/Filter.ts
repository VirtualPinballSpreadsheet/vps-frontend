import type { fileTypes, Game, FileUpload } from './VPin';

export interface SearchOptions {
	mode: (typeof fileTypes)[number] | 'game';
	filterState: FilterState;
	filterValues: FilterValues;
	sortBy: SortBy;
}

export interface FilterOptions {
	theme: string[];
	manufacturer: string[];
	year: [number, number];
	authors: string[];
	features: string[];
}

export interface FilterValues {
	theme: string[];
	manufacturer: string[];
	year: [number, number];
	features: string[];
	players: [number, number];
	type: 'EM' | 'SS' | 'PM';
	letter: LetterFilter;
	authors: string[];
}
export interface FilterState {
	theme: boolean;
	manufacturer: boolean;
	year: boolean;
	authors: boolean;
	features: boolean;
	players: boolean;
	type: boolean;
	broken: boolean;
	notBroken: boolean;
	noImages: boolean;
}

export const letters = [
	'All',
	'#',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
] as const;

export type LetterFilter = (typeof letters)[number];

export type Mode = 'game' | (typeof fileTypes)[number];

export type SortBy =
	| 'lastUpdated'
	| 'leastUpdated'
	| 'yearASC'
	| 'yearDSC'
	| 'nameASC'
	| 'nameDSC'
	| 'designerASC'
	| 'designerDSC';

const sortUpdatedGames = (a: Game, b: Game) => {
	return (b.lastCreatedAt || b.updatedAt) - (a.lastCreatedAt || a.updatedAt);
}

const sortUpdatedFiles = (a: FileUpload, b: FileUpload) => {
	return (b.createdAt || 0) - (a.createdAt || 0);
}

const sortYear = (a: Game, b: Game) => {
	const c = (a.year || 0) - (b.year || 0);
	return c == 0 ? sortName(a, b) : c;
}

const sortName = (a: Game, b: Game) => {
	return (a.name || '').localeCompare(b.name || '');
}

const sortDesigner = (a: Game, b: Game, missing: string) => {
	const c = (a.designers?.[0] || missing).localeCompare(b.designers?.[0] || missing);
	return c == 0 ? sortName(a, b) : c;
}

export const sortOptions: {
	name: string;
	sortBy: SortBy;
	compareGames: (a: Game, b: Game) => number;
	compareFiles: (af: FileUpload, ag: Game, bf: FileUpload, bg: Game) => number;
}[] = [
		{
			name: "Last Updated", sortBy: 'lastUpdated',
			compareGames: (a, b) => { return sortUpdatedGames(a, b) },
			compareFiles: (af, ag, bf, bg) => { return sortUpdatedFiles(af, bf) }
		},
		{
			name: "Least Updated", sortBy: 'leastUpdated',
			compareGames: (a, b) => { return sortUpdatedGames(b, a) },
			compareFiles: (af, ag, bf, bg) => { return sortUpdatedFiles(bf, af) }
		},
		{
			name: "Year Ascending", sortBy: 'yearASC',
			compareGames: (a, b) => { return sortYear(a, b) },
			compareFiles: (af, ag, bf, bg) => { return sortYear(ag, bg) }
		},
		{
			name: "Year Descending", sortBy: 'yearDSC',
			compareGames: (a, b) => { return sortYear(b, a) },
			compareFiles: (af, ag, bf, bg) => { return sortYear(bg, ag) }
		},
		{
			name: "Name A-Z", sortBy: 'nameASC',
			compareGames: (a, b) => { return sortName(a, b) },
			compareFiles: (af, ag, bf, bg) => { return sortName(ag, bg) }
		},
		{
			name: "Name Z-A", sortBy: 'nameDSC',
			compareGames: (a, b) => { return sortName(b, a) },
			compareFiles: (af, ag, bf, bg) => { return sortName(bg, ag) }
		},
		{
			name: "Designer A-Z", sortBy: 'designerASC',
			compareGames: (a, b) => { return sortDesigner(a, b, 'zzz') },
			compareFiles: (af, ag, bf, bg) => { return sortDesigner(ag, bg, 'zzz') }
		},
		{
			name: "Designer Z-A", sortBy: 'designerDSC',
			compareGames: (a, b) => { return sortDesigner(b, a, '@@@') },
			compareFiles: (af, ag, bf, bg) => { return sortDesigner(bg, ag, '@@@') }
		},
	]
