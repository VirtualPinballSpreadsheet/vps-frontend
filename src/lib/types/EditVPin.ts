import type { Game } from './VPin';

export type GameEdit = CreateEdit | DeleteEdit | UpdateEdit;

export interface CreateEdit {
	action: 'CREATE';
	id: string;
	data: Game;
}
export interface DeleteEdit {
	action: 'DELETE';
	id: string;
	data: Game;
}
export interface UpdateEdit {
	action: 'UPDATE';
	id: string;
	data: Game;
}
