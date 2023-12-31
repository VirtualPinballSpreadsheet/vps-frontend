import type { fileTypes } from './VPin';

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
