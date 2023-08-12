import { DB } from '$lib/stores/DbStore';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = ({ params }) => {
	const db = get(DB.dbStore);
	if (db[params.id]) {
		return {
			id: params.id
		};
	}

	throw error(404, 'Not found');
};
