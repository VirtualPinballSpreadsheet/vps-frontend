<script lang="ts">
	import { page } from '$app/stores';
	import TutorialCard from '$lib/components/cards/TutorialCard.svelte';
	import HeaderInfo from './HeaderInfo.svelte';
	import { mobile } from '$lib/helper/mobile';
	import type { TutorialFile } from '$lib/types/VPin';

	export let tutorials: TutorialFile[] = [];
	export let gameId: string;
	$: _tutorials = tutorials.sort((a, b) => b.updatedAt - a.updatedAt);

	$: fileId = $page.url.searchParams.get('fileId');
</script>

{#if tutorials?.length}
	<div class="flex flex-col gap-4">
		<HeaderInfo title="Tutorials">Helpful tutorials that explain the rules of the game.</HeaderInfo>

		{#if $mobile.mobile}
			<div class="flex flex-col gap-6">
				{#each _tutorials as tutorial}
					<TutorialCard file={tutorial} active={fileId === tutorial.id} {gameId} />
				{/each}
			</div>
		{:else}
			<div class="grid layout gap-y-10 gap-x-4">
				{#each _tutorials as tutorial}
					<TutorialCard file={tutorial} active={fileId === tutorial.id} {gameId} />
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.layout {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
