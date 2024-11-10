export interface Tournament {
	title: string;
	createdAt: number;
	location: string;
	players: string[];
	games: TournamentGame[];
	vpin?: boolean;
	comment?: string;
	id: string;
	points: number[];
}

export interface TournamentGame {
	gameId: string;
	tableId?: string;
	scores: { [player: string]: number };
	balls: number;
	comment?: string;
}
