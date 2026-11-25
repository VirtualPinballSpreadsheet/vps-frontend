<script lang="ts">
	import { DB } from '$lib/stores/DbStore';
	import type { Game } from '$lib/types/VPin';
	import { gameLabel } from '$lib/helper/scraperUtils';
	import { levenshteinDistance } from '$lib/helper/levenstein';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let hint = '';
	export let onSelect: (game: Game) => void;
	export let onClose: () => void;

	let query = '';

	// substring hits first, then fuzzy-ranked rest — lists stay small
	$: results = pickGames(query);

	function pickGames(q: string): Game[] {
		const games = Object.values($dbStore);
		if (!games.length) return [];
		const lower = q.trim().toLowerCase();
		if (!lower) return [];
		const contains: Game[] = [];
		const fuzzy: { game: Game; score: number }[] = [];
		for (const game of games) {
			const name = (game.name || '').toLowerCase();
			if (!name) continue;
			if (name.includes(lower)) contains.push(game);
			else fuzzy.push({ game, score: levenshteinDistance(lower, name) });
		}
		fuzzy.sort((a, b) => a.score - b.score);
		return [...contains, ...fuzzy.map((f) => f.game)].slice(0, 20);
	}

	const { dbStore } = DB;
</script>

<div class="card p-4 flex flex-col gap-3 variant-soft-surface">
	<div class="flex items-center justify-between">
		<span class="h5">Pick a game</span>
		<button class="btn btn-sm variant-ghost-secondary" on:click={onClose}>
			<Fa icon={faXmark} />
		</button>
	</div>
	{#if hint}<p class="opacity-60 text-sm">{hint}</p>{/if}
	<input class="input" placeholder="Search games…" bind:value={query} />
	{#if query && !results.length}
		<p class="text-sm opacity-60">No matches.</p>
	{/if}
	<div class="flex flex-col gap-1 max-h-72 overflow-y-auto">
		{#each results as game (game.id)}
			<button
				class="text-left px-2 py-1 rounded hover:bg-surface-hover-token"
				on:click={() => onSelect(game)}
			>
				{gameLabel(game)}
			</button>
		{/each}
	</div>
</div>
