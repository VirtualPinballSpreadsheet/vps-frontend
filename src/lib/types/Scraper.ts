// Schema of the scraper report (https://davidkoski.github.io/vps-db-tool/index.json).
// Produced by vps-db-tool's ReportCommand as { [GameResourceKind]: Action[] }.

export type ScraperKind =
	| 'game'
	| 'table'
	| 'b2s'
	| 'tutorial'
	| 'rom'
	| 'pupPack'
	| 'altColor'
	| 'altSound'
	| 'pov'
	| 'wheelArt'
	| 'topper'
	| 'mediaPack'
	| 'rule'
	| 'sound';

// Swift DateKind enum JSON: "unknown" | "undated" | { date: { _0: epochMillis } }
export type ReportDate = 'unknown' | 'undated' | { date: { _0: number } };

export interface ReportDetail {
	detailKind: 'list' | 'detail';
	/** canonical URL, extra data stripped */
	url: string;
	/** cleaned URL we want to store in the database */
	normalizedURL: string;
	site: string;
	kind: ScraperKind;
	name: string;
	author: string;
	version?: string;
	/** description scraped from the source page; may contain HTML */
	text?: string;
	images: string[];
	date: ReportDate;
}

export interface ReportAction {
	action: 'new' | 'update';
	message: string;
	detail: ReportDetail;
	/** id of the game this was matched to, if any */
	gameId?: string;
	kind: ScraperKind;
	/** id of the existing DB file, for updates */
	id?: string;
	/** ready-made resource of the action's kind; its `game` is a placeholder */
	file?: any;
}

export type ReportIndex = Partial<Record<ScraperKind, ReportAction[]>>;
