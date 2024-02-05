import type { Tournament } from '$lib/types/Tournament';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { nanoid } from 'nanoid';

const tournamentStore = localStorageStore<Tournament[]>('tournaments', []);

const addNewTournament = () => {
	const id = nanoid(10);
	const createdAt = new Date().getTime();
	const newTournament = {
		id,
		createdAt,
		players: [],
		games: [],
		location: '',
		title: 'My Pinball Tournament'
	};
	tournamentStore.update((t) => [...t, newTournament]);
	return newTournament;
};

export const Tournaments = { tournamentStore, addNewTournament };
