export interface Database {
	[key: string]: Game;
}

export interface Game {
	id: string;
	name: string;
	year: number;
	manufacturer: string;
	youtubeId?: string;
	MPU?: string;
	theme?: string[];
	players?: number;
	designers?: string[];
	ipdbUrl?: string;
	features?: string[];
	type?: 'EM' | 'SS' | 'PM' | 'DG';
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
	tutorialFiles?: TutorialFile[];
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
	'ruleFiles',
	'tutorialFiles'
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
	// For internal search only
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
	tableFormat: 'VPX' | 'VP9' | 'PM5' | 'FX3' | 'FX2' | 'FX' | 'FP' | 'M';
	features?: TableFeature[];
	theme?: string[];
	comment?: string;
	gameFileName?: string;
	edition?: string;
	romId?: string;
}

export interface B2SFile extends FileUpload {
	features?: B2SFeature[];
	comment?: string;
}
export interface RomFile extends FileUpload {
	colored?: boolean;
	fileName?: string;
	comment?: string;
}
export interface AltColorFile extends FileUpload {
	romName?: string;
	comment?: string;
	fileName?: string;
	filder?: string;
	type?: string;
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

export interface TutorialFile {
	authors: string[];
	updatedAt: number;
	createdAt?: number;
	id: string;
	title: string;
	youtubeId: string;
}

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

export type B2SFeature = (typeof B2SFeatures)[number];

export const B2SFeatures = ['2Screens', '3Screens', 'FullDMD', 'incl. Table'] as const;

export const TableFeatureOptions = TableFeatures.map((f) => ({ label: f, value: f }));
export const B2SFeatureOptions = B2SFeatures.map((f) => ({ label: f, value: f }));

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
export const EmptyTutorialFile: TutorialFile = {
	authors: [],
	id: '',
	updatedAt: 0,
	title: '',
	youtubeId: 'dQw4w9WgXcQ'
};

export const EmptyFile: FileUpload = {
	authors: [],
	id: '',
	updatedAt: 0,
	urls: []
};
