import type { Tournament } from '$lib/types/Tournament';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { nanoid } from 'nanoid';
import { get } from 'svelte/store';

const tournamentStore = localStorageStore<Tournament[]>('tournaments', []);

const addNewTournament = () => {
	const id = nanoid(10);
	const createdAt = new Date().getTime();
	const newTournament: Tournament = {
		id,
		createdAt,
		players: [],
		games: [],
		points: [],
		location: '',
		title: 'My Pinball Tournament'
	};
	tournamentStore.update((t) => [...t, newTournament]);
	return { tournament: newTournament, index: get(tournamentStore).length - 1 };
};

export const Tournaments = { tournamentStore, addNewTournament };
