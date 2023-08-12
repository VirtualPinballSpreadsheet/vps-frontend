import { get, writable } from 'svelte/store';
import type { Database, Game } from '../types/VPin';

const dbStore = writable<Database>({});

const fetchDb = async () => {
	try {
		const res = await fetch(
			`https://fraesh.github.io/vps-db/vpsdb.json`
			// `https://fraesh.github.io/vps-db/vpsdb.json?ts=${new Date().getTime()}`
		);

		const data = await res.json();
		const _db: Database = {};
		data.forEach((d: Game) => {
			const id = d.id;
			_db[id] = d;
		});
		dbStore.set(_db);
	} catch (e) {
		console.log(e);
	}
};

const getGameImage = (id: string) => {
	const $db = get(dbStore);
	const game = $db[id];
	if (!game) return;
	if (game.imgUrl) return game.imgUrl;
	if (game.b2sFiles?.length && game.b2sFiles[0].imgUrl) return game.b2sFiles[0].imgUrl;
	if (game.tableFiles?.length && game.tableFiles[0].imgUrl) return game.tableFiles[0].imgUrl;
};

export const DB = {
	fetchDb,
	getGameImage,
	dbStore
};
