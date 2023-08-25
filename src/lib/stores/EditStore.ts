import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { GameEdit } from '$lib/types/EditVPin';
import { User } from './UserStore';

const editStore: Writable<{ edits: GameEdit[]; cache?: GameEdit }> = localStorageStore('edits', {
	edits: []
});

const saveEdit = () => {
	editStore.update(($editStore) => {
		const edit = $editStore.cache;
		if (!edit) return $editStore;
		const i = $editStore.edits.findIndex((g) => g.id === edit.id);
		if (i <= -1) {
			$editStore.edits.push(edit);
		} else {
			$editStore.edits[i].data = edit.data;
		}

		return $editStore;
	});
};

const deleteEdit = (edit: GameEdit) => {
	editStore.update(($editStore) => {
		const i = $editStore.edits.findIndex((g) => g.id === edit.id);
		if (i <= -1) return $editStore;
		$editStore.edits = $editStore.edits.filter((g) => g.id !== edit.id);

		return $editStore;
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

export const Edit = {
	editStore,
	saveEdit,
	deleteEdit,
	submitChanges
};
