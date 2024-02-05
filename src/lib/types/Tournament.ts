export interface Tournament {
	title: string;
	createdAt: number;
	location: string;
	players: string[];
	games: TournamentGame[];
	vpin?: boolean;
	comment?: string;
	id: string;
	scores: number[];
}

export interface TournamentGame {
	gameId: string;
	tableId?: string;
	points: { [player: string]: number };
	balls: number;
	comment?: string;
}
