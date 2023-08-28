import { localStorageStore } from '@skeletonlabs/skeleton';
import { derived } from 'svelte/store';
import { DB } from './DbStore';
import type { Mode } from '$lib/types/Filter';

export interface FileListStore {
	[key: string]: FileList;
}
export interface FileList {
	// Game
	[key: string]: {
		// FileType : ids
		[key in Mode]?: string[];
	};
}

const listStore = localStorageStore<FileListStore>('lists', {});
const checkedBookmarks = localStorageStore<string[]>('ckechedBookmarks', []);

const bookmarks = derived([listStore, DB.dbStore], ([$list, $db]) => {
	const $bookmarks = $list['bookmarks'] || [];
	const res: any[] = [];
	Object.entries($bookmarks).forEach(([gameId, fileTypes]) => {
		const name = $db[gameId]?.name;
		if (!name) return;
		const game: any = { name, id: gameId, files: {} };
		Object.entries(fileTypes)
			.sort((i1, i2) => (i1[0] < i2[0] ? -1 : 1))
			.forEach(([fileType, files]) => {
				const ft = files.map((id) => {
					//@ts-ignore
					const _file = $db[gameId]?.[fileType]?.find((el) => el.id === id);
					return _file;
				});
				game.files[fileType] = ft;
			});
		res.push(game);
	});

	return res;
});

const addToList = (list: string, gameId: string, fileType: Mode, id: string) => {
	listStore.update((store) => {
		if (!store[list]) store[list] = {} as FileList;
		const $list = store[list];
		if (!$list[gameId]) $list[gameId] = {};
		if (!$list[gameId][fileType]) $list[gameId][fileType] = [];
		if ($list[gameId][fileType]?.includes(id)) return store;
		$list[gameId][fileType]?.push(id);
		return store;
	});
};

const deleteFromList = (list: string, id: string) => {
	listStore.update(($listStore) => {
		const $list = $listStore[list];
		if (!$list) return;
		if ($list[id]) {
			delete $list[id];
			return $listStore;
		}
		for (const gameId in $list) {
			const game = $list[gameId];
			for (const fileType in game) {
				if (game[fileType]?.includes(id)) {
					game[fileType] = game[fileType].filter((_id) => id !== _id);
					return $listStore;
				}
			}
		}
		return $listStore;
	});
};

export const List = { listStore, bookmarks, checkedBookmarks, addToList, deleteFromList };
