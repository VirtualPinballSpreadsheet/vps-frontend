import type { Game } from '$lib/types/VPin';

export const getLastCreatedAt = (table: Game, path: string) => {
	//@ts-ignore
	const createdDates = (table[path] || [])
		//@ts-ignore
		.map((f) => f.createdAt)
		//@ts-ignore
		.sort((a, b) => (b || 0) - (a || 0));

	return createdDates.length ? createdDates[0] : 0;
};
