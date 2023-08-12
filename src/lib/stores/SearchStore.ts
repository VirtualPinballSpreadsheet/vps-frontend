import { type Game, fileTypes, type FileUpload } from '$lib/types/VPin';
import MiniSearch from 'minisearch';
import { derived } from 'svelte/store';
import { DB } from './DbStore';

const minisearch = new MiniSearch<Game>({
	fields: [
		'name',
		'manufacturer',
		'year',
		'tableFiles',
		'b2sFiles',
		'theme',
		'designers',
		'features'
	],
	extractField: (document: any, fieldName) => {
		// If field name is 'pubYear', extract just the year from 'pubDate'

		if (['tableFiles', 'b2sFiles'].includes(fieldName)) {
			const vals = document[fieldName]?.reduce(
				(a: any, b: any) => [...a, ...(b.authors || [])],
				[]
			);
			return vals?.join(', ') || '';
		}

		if (Array.isArray(document[fieldName])) return document[fieldName].join(', ');
		// Access nested fields

		return document[fieldName];
	}
});

DB.dbStore.subscribe(($db) => {
	minisearch.removeAll();
	minisearch.addAll(Object.values($db));
});

const sortedDbStore = derived(DB.dbStore, ($db) => {
	return Object.values($db).sort((a, b) => {
		return b.updatedAt - a.updatedAt;
	});
});

const sortedFilesStore = derived(DB.dbStore, ($db) => {
	const games = Object.values($db);

	const res: { [K in (typeof fileTypes)[number]]?: FileUpload[] } = {};
	for (const fileType of fileTypes) {
		res[fileType] = [];
	}

	// Append all filetypes separately
	for (const game of games) {
		for (const fileType of fileTypes) {
			const files = game[fileType];
			if (Array.isArray(files)) {
				res[fileType] = (res[fileType] || []).concat(
					files.map((f) => ({ ...f, game: { id: game.id, name: game.name } }))
				);
			}
		}
	}

	// Sort all
	Object.entries(res).forEach(([key, val]) => {
		//@ts-ignore
		res[key] = val.sort((a, b) => {
			return (b.createdAt || 0) - (a.createdAt || 0);
		});
	});

	return res;
});

export const Search = {
	sortedDbStore,
	sortedFilesStore
};
