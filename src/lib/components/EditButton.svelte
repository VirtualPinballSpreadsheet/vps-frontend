<script lang="ts">
	import { DB } from '$lib/stores/DbStore';
	import { Edit } from '$lib/stores/EditStore';
	import { User } from '$lib/stores/UserStore';
	import type { FileUpload, Game } from '$lib/types/VPin';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	const { userStore } = User;
	const { editStore } = Edit;
	const { dbStore } = DB;

	export let file: FileUpload | undefined = undefined;
	export let game: Game | undefined = undefined;

	$: _game = game ? game : file?.game?.id ? $dbStore[file.game!.id] : undefined;
</script>

{#if _game && $userStore.admin}
	<a
		href="?edit=true"
		class="pointer-events-auto chip variant-soft-primary hover:variant-filled-primary gap-2 flex-1 p-2"
		on:click={() => {
			$editStore.cache = {
				id: _game.id,
				action: 'UPDATE',
				data: JSON.parse(JSON.stringify(_game))
			};
		}}><Fa icon={faEdit} /></a
	>
{/if}
