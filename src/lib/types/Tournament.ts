export interface Tournament {
	title: string;
	createdAt: number;
	location: string;
	players: string[];
	games: TournamentGame[];
	vpin?: boolean;
	comment?: string;
}

export interface TournamentGame {
	gameId: string;
	tableId?: string;
	scores: { [player: string]: number };
	points: { [player: string]: number };
	balls: number;
	comment?: string;
}
