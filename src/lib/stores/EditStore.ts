import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { GameEdit } from '$lib/types/EditVPin';
import { User } from './UserStore';
import { cleanupGame } from '$lib/helper/cleanupGame';
import { DB } from './DbStore';
import { fileTypes } from '$lib/types/VPin';

const editStore: Writable<{ edits: GameEdit[]; cache?: GameEdit }> = localStorageStore('edits', {
	edits: []
});

const saveEdit = () => {
	editStore.update(($editStore) => {
		const edit = $editStore.cache;
		if (!edit) return $editStore;
		edit.data = cleanupGame(edit.data);
		// edit.data.updatedAt = new Date().getTime();
		const i = $editStore.edits.findIndex((g) => g.id === edit.id);
		if (i <= -1) {
			$editStore.edits.push(edit);
		} else {
			$editStore.edits[i].data = edit.data;
		}

		return $editStore;
	});
	updateEditsToDb();
};

const deleteEdit = (edits: GameEdit[]) => {
	editStore.update(($editStore) => {
		edits.forEach((edit) => {
			const i = $editStore.edits.findIndex((g) => g.id === edit.id);
			if (i <= -1) return $editStore;
			$editStore.edits = $editStore.edits.filter((g) => g.id !== edit.id);
		});
		return $editStore;
	});
	DB.dbStore.update(($db) => {
		edits.forEach((edit) => {
			const oldGame = get(DB.dbStoreOriginal)[edit.id];
			if (oldGame) {
				$db[edit.id] = oldGame;
			} else {
				delete $db[edit.id];
			}
		});
		return $db;
	});
};

const submitChanges = async () => {
	const { edits } = get(editStore);
	const uploaded: string[] = [];
	for (const edit of edits) {
		const { id, data, action } = edit;
		if (action === 'UPDATE' || action === 'CREATE') {
			const res = await User.uploadGameFile(data);
			if (res) {
				uploaded.push(id);
			}
		}
	}

	editStore.update(($editStore) => {
		$editStore.edits = $editStore.edits.filter((e) => !uploaded.includes(e.id));
		return $editStore;
	});

	return { uploaded, notUploaded: edits.filter((e) => !uploaded.includes(e.id)).map((e) => e.id) };
};

const updateEditsToDb = () => {
	const edits = get(editStore).edits;
	if (!edits.length) return;
	DB.dbStore.update((db) => {
		edits.forEach((e) => {
			if (e.action === 'CREATE' || e.action === 'UPDATE') {
				db[e.id] = e.data;
			} else {
				delete db[e.id];
			}
		});
		return db;
	});
};

const alignAuthors = (newAuthor: string, oldAuthors: string[]) => {
	const $db = get(DB.dbStore);
	Object.values($db).forEach((game) => {
		let isEdited = false;
		fileTypes.forEach((ft) => {
			game[ft]?.forEach((file, i) => {
				file.authors?.forEach((a, j) => {
					if (!oldAuthors.includes(a)) return;
					isEdited = true;
					game[ft][i].authors[j] = newAuthor;
				});
			});
		});

		if (!isEdited) return;
		editStore.update(($editStore) => {
			const index = $editStore.edits.findIndex((_e) => _e.id === game.id);
			if (index > -1) {
				$editStore.edits[index].data = game;
			} else {
				$editStore.edits.push({ action: 'UPDATE', data: game, id: game.id });
			}
			return $editStore;
		});
	});
	updateEditsToDb();
};

export const Edit = {
	editStore,
	saveEdit,
	deleteEdit,
	submitChanges,
	alignAuthors,
	updateEditsToDb
};
