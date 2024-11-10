<script lang="ts">
	import {
		faAdd,
		faArrowLeft,
		faChevronDown,
		faEdit,
		faTrophy
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { Tournaments } from '$lib/stores/tournamentStore';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { DB } from '$lib/stores/DbStore';

	export let data: PageData;
	let { tindex } = data;
	const { tournamentStore } = Tournaments;
	const { dbStore } = DB;
	$: tournament = $tournamentStore.length >= tindex ? $tournamentStore[tindex] : undefined;

	const onAdd = () => {
		if (!tournament) return;
		$tournamentStore[tindex].games.push({ balls: 3, points: {}, scores: {}, gameId: '' });
		$tournamentStore = $tournamentStore;
		goto(tindex + '/' + tournament.games.length - 1);
	};
</script>

{#if tournament}
	<div class="flex flex-col">
		<div class="flex flex-row gap-2 items-center justify-between bg-secondary-600/20 p-2">
			<button
				class="btn btn-icon"
				on:click={() => {
					goto('/tournaments');
				}}
			>
				<Fa icon={faArrowLeft} />
			</button>
			<div class="flex flex-1 flex-col">
				<div class="leading-4 font-bold">{tournament?.title}</div>
				<div class="leading-4 opacity-60">{tournament?.players.join(', ')}</div>
			</div>
			<button
				class="btn btn-sm variant-filled-secondary flex gap-4 items-center"
				on:click={() => {
					goto(tindex + '/edit');
				}}
			>
				<Fa icon={faEdit} />
				Edit
			</button>
		</div>
		<div class="flex flex-row gap-2 items-center bg-tertiary-600/20 p-2 h-14">
			<button
				class="btn btn-sm variant-filled-tertiary flex-1 flex gap-4 items-center"
				on:click={() => {
					goto(tindex + '/edit');
				}}
			>
				<Fa icon={faTrophy} />
				View Results
			</button>
			<button
				class="btn btn-sm variant-ghost-tertiary flex gap-4 items-center"
				on:click={() => {
					goto(tindex + '/edit');
				}}
			>
				<Fa icon={faChevronDown} />
				Export
			</button>
		</div>
		<div class="flex flex-col">
			{#each tournament.games as game, i}
				{@const bestScore = Object.entries(game.scores).sort((a, b) => b[1] - a[1])[0]}
				<a
					href={`${tindex}/${i}`}
					class="py-4 px-4 hover:bg-primary-400/20 flex gap-4 items-center"
				>
					<div class="flex items-center justify-center variant-ghost-tertiary p-4 rounded shrink-0">
						<div class="w-6 h-6 flex items-center justify-center text-md font-bold">{i + 1}</div>
					</div>
					<div class="flex flex-col">
						<div class="font-bold">{$dbStore[game?.gameId]?.name}</div>
						<div class="opacity-60">
							{bestScore?.join(' - ')}
						</div>
					</div>
				</a>
			{/each}
		</div>
		<button class="btn variant-filled-primary flex gap-4 items-center m-4" on:click={onAdd}>
			<Fa icon={faAdd} />
			Add Game
		</button>
	</div>
{/if}
