<script lang="ts">
	import { User } from '$lib/stores/UserStore';
	import type { FileUpload, Game } from '$lib/types/VPin';
	import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { JsonView } from '@zerodevx/svelte-json-view';
	import Fa from 'svelte-fa';

	const { userStore } = User;
	export let game: Game;

	export let open = false;
</script>

{#if $userStore.admin}
	<div class="flex flex-col gap-4">
		<button on:click={() => (open = !open)} class="h3 flex gap-2 items-center"
			>Admin <Fa icon={open ? faChevronUp : faChevronDown} size="12" /></button
		>

		{#if open}
			<JsonView json={game} depth={0} />
		{/if}
	</div>
{/if}
