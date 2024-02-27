<script>
	import { Edit } from '$lib/stores/EditStore';
	import { faAdd, faCodeMerge } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';
	import { EmptyGame } from '$lib/types/VPin';

	const { editStore } = Edit;

	const addNewGame = () => {
		const id = nanoid(10);
		$editStore.cache = {
			id,
			action: 'CREATE',
			data: JSON.parse(JSON.stringify({ ...EmptyGame, id }))
		};
	};
</script>

<div class="card 8 shadow-xl popup" data-popup="popupAdmin">
	<ul>
		<a href="?edit=true" on:click={addNewGame}>
			<li
				class="select-none cursor-pointer p-4 hover:bg-surface-hover-token text-sm flex gap-2 items-center"
			>
				<Fa icon={faAdd} /> Add new game
			</li></a
		>
		<a href="alignAuthors">
			<li
				class="select-none cursor-pointer p-4 hover:bg-surface-hover-token text-sm flex gap-2 items-center"
			>
				<Fa icon={faCodeMerge} /> Align authors
			</li></a
		>
	</ul>
</div>
