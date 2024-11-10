import { Tournaments } from '$lib/stores/tournamentStore';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { tindex } = params;

	return {
		tindex
	};
};
