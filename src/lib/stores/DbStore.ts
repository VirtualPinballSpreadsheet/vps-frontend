import { get, writable } from 'svelte/store';
import type { Database, Game } from '../types/VPin';
import { DB_URL } from '../../env';
import { localStorageStore } from '@skeletonlabs/skeleton';

const dbStore = writable<Database>({});
const dbStoreCache = localStorageStore<Database>('db', {});
const lastUpdated = localStorageStore<number>('lastUpdatedDb', 0);

const fetchDb = async () => {
	try {
		const _lu = await fetchLastUpdatedDb();
		let data;
		let _db: Database = {};

		if (_lu == get(lastUpdated)) {
			// No update and already have db;
			if (Object.keys(get(dbStore)).length > 0) return;
			_db = get(dbStoreCache);
		} else {
			const res = await fetch(DB_URL);
			data = await res.json();

			data.forEach((d: Game) => {
				const id = d.id;
				_db[id] = d;
			});
			dbStoreCache.set(_db);
		}
		lastUpdated.set(_lu);
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

const fetchLastUpdatedDb = async () => {
	try {
		const res = await fetch(
			'https://api.github.com/repos/VirtualPinballSpreadsheet/vps-db/commits?path=db/vpsdb.json&per_page=1'
		);
		const resJson = await res.json();
		const date = resJson[0].commit.author.date;
		return new Date(date).getTime();
	} catch (e) {
		return 0;
	}
};

export const DB = {
	fetchDb,
	getGameImage,
	lastUpdated,
	dbStore
};
