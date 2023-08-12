export interface Database {
	[key: string]: Game;
}

export interface Game {
	id: string;
	name: string;
	year: number;
	manufacturer: string;
	MPU?: string;
	theme?: string[];
	players?: number;
	designers?: string[];
	ipdbUrl?: string;
	features?: string[];
	type?: 'EM' | 'SS' | 'PM';
	updatedAt: number;
	lastCreatedAt?: number;
	broken?: boolean;
	tableFiles?: TableFile[];
	povFiles?: POVFile[];
	b2sFiles?: B2SFile[];
	romFiles?: RomFile[];
	altColorFiles?: AltColorFile[];
	altSoundFiles?: AltSoundFile[];
	pupPackFiles?: PuPPackFile[];
	wheelArtFiles?: WheelArtFile[];
	topperFiles?: TopperFile[];
	mediaPackFiles?: MediaPackFile[];
	soundFiles?: SoundFile[];
	ruleFiles?: RuleFile[];
	imgUrl?: string;
}

export const fileTypes = [
	'tableFiles',
	'povFiles',
	'b2sFiles',
	'romFiles',
	'altColorFiles',
	'altSoundFiles',
	'pupPackFiles',
	'wheelArtFiles',
	'topperFiles',
	'mediaPackFiles',
	'soundFiles',
	'ruleFiles'
] as const;

export interface FileUpload {
	urls: FileUrl[];
	authors: string[];
	updatedAt: number;
	createdAt?: number;
	imgUrl?: string;
	broken?: boolean;
	id: string;
	version?: string;
	game?: {
		id: string;
		name: string;
	};
}

export interface FileUrl {
	url: string;
	broken?: boolean;
}

export interface TableFile extends FileUpload {
	tableFormat: 'VPX' | 'VP9' | 'PM5' | 'FX3' | 'FX2' | 'FX' | 'FP';
	features?: TableFeature[];
	theme?: string[];
	comment?: string;
	gameFileName?: string;
}

export interface B2SFile extends FileUpload {
	features?: B2SFeature[];
	comment?: string;
}
export interface RomFile extends FileUpload {
	colored?: boolean;
}
export interface AltColorFile extends FileUpload {
	romName?: string;
}

export interface POVFile extends FileUpload {}

export interface AltSoundFile extends FileUpload {}

export interface PuPPackFile extends FileUpload {}

export interface RuleFile extends FileUpload {}

export interface WheelArtFile extends FileUpload {
	animated?: boolean;
}

export interface TopperFile extends FileUpload {}

export interface MediaPackFile extends FileUpload {}

export interface SoundFile extends FileUpload {}

export type TableFeature = (typeof TableFeatures)[number];

export const TableFeatures = [
	'Hybrid',
	'VR',
	'FSS',
	'4k',
	'MOD',
	'FastFlips',
	'SSF',
	'P-ROC',
	'FlexDMD',
	'Music',
	'incl. B2S',
	'incl. ROM',
	'incl. Art',
	'incl. PuP',
	'incl. Video',
	'no ROM',
	'Kids',
	'Adult',
	'nFozzy',
	'Fleep',
	'LUT',
	'Scorbit'
];

export type B2SFeature = '2Screens' | '3Screens' | 'FullDMD';

export const B2SFeatures = ['2Screens', '3Screens', 'FullDMD'];

export const EmptyTableFile: TableFile = {
	id: '',
	authors: [],
	tableFormat: 'VPX',
	urls: [],
	updatedAt: 0
};
export const EmptyGame: Game = {
	id: '',
	updatedAt: 0,
	manufacturer: '',
	name: '???',
	year: 0
};

export const EmptyB2sFile: B2SFile = {
	authors: [],
	id: '',
	updatedAt: 0,
	urls: []
};

export const EmptyFile: FileUpload = {
	authors: [],
	id: '',
	updatedAt: 0,
	urls: []
};
