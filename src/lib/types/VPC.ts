export interface VPC {
	_id: string;
	channelName: string;
	weekNumber: number;
	periodStart: string;
	periodEnd: string;
	table: string;
	authorName: string;
	versionNumber: string;
	vpsId: string;
	mode: string;
	tableUrl: string;
	romUrl: string;
	romName: string;
	b2sUrl: string;
	season: number | null;
	currentSeasonWeekNumber: number;
	notes: string | null;
	scores: VPCScore[];
	teams: any[];
	isArchived: boolean;
}

export interface VPCScore {
	username: string;
	userAvatarUrl: string;
	score: number;
	diff: number;
	mode: string;
	posted: string;
	points: number;
}
