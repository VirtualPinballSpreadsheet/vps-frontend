<script lang="ts">
	import {
		faAdd,
		faArrowLeft,
		faArrowRight,
		faBackwardStep,
		faEdit,
		faForwardStep
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { Tournaments } from '$lib/stores/tournamentStore';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { Autocomplete, popup, SlideToggle, type PopupSettings } from '@skeletonlabs/skeleton';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { Search } from '$lib/stores/SearchStore';
	import { DB } from '$lib/stores/DbStore';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import { onMount } from 'svelte';

	export let data: PageData;
	let { tindex, gindex } = data;
	const { tournamentStore } = Tournaments;
	const { sortedFilesStore, sortedDbStore } = Search;
	const { dbStore } = DB;

	$: tournament = $tournamentStore[tindex];
	$: game = (tournament?.games?.length || -1) >= gindex ? tournament?.games[gindex] : undefined;
	$: gameData = game.gameId ? $dbStore[game.gameId] : undefined;

	let inputDemo = gameData?.name || '';
	$: options = $sortedDbStore.map((g) => ({ label: g.name, value: g.id }));

	onMount(() => {
		inputDemo = gameData?.name || '';
	});

	function onGameSelection(event: CustomEvent<any>): void {
		inputDemo = event.detail.label;
		$tournamentStore[tindex].games[gindex].gameId = event.detail.value;
	}
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

{#if game && tournament}
	<!-- {JSON.stringify(game)} -->
	<div class="flex flex-row gap-2 items-center bg-secondary-600/20 p-2">
		<button
			class="btn btn-icon flex gap-4 items-center self-start"
			on:click={() => {
				goto('/tournaments/' + tindex);
			}}
		>
			<Fa icon={faArrowLeft} />
		</button>
		<div class="flex flex-col">
			<div class="leading-4 font-bold">Game {gindex + 1}</div>
			<div class="leading-4 opacity-60">{tournament?.title}</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 p-4 md:p-10 min-h-full">
		<div class="flex">
			<button
				class="btn btn-icon-lg flex gap-4 items-center"
				disabled={gindex <= 0}
				on:click={() => {
					goto(tindex + '/' + gindex - 1);
				}}
			>
				<Fa icon={faBackwardStep} />
			</button>
			<input
				class="input autocomplete"
				type="search"
				name="autocomplete-search"
				bind:value={inputDemo}
				placeholder="Pick a table"
				use:popup={popupSettings}
			/>
			<div
				data-popup="popupAutocomplete"
				class="card max-h-48 p-4 overflow-y-auto z-50 max-w-[80vw]"
			>
				<Autocomplete bind:input={inputDemo} {options} on:selection={onGameSelection} />
			</div>
			<button
				class="btn btn-icon-lg flex gap-4 items-center"
				on:click={() => {
					if (gindex === $tournamentStore.length - 1) {
						$tournamentStore[tindex].games.push({ balls: 3, points: {}, scores: {}, gameId: '' });
					}
					goto('' + (parseInt(gindex) + 1));
				}}
			>
				<Fa icon={faForwardStep} />
			</button>
		</div>
		<img src={getBackglassUrl(gameData)} alt={''} class="card aspectTable rounded" />
		<div class="flex gap-4 items-center">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">Balls</div>
				<input
					type="number"
					placeholder="1234567890"
					bind:value={$tournamentStore[tindex].games[gindex].balls}
				/>
			</div>
			<SlideToggle
				size="sm"
				class="md:pt-6"
				active="variant-filled-primary"
				name="slide"
				bind:checked={$tournamentStore[tindex].games[gindex].vpin}>VPin</SlideToggle
			>
		</div>
		<hr />
		{#each tournament.players as player}
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim w-[8rem]">{player}</div>
				<input
					type="number"
					placeholder="Enter score..."
					bind:value={$tournamentStore[tindex].games[gindex].scores[player]}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.aspectTable {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
	}
	.glow {
		outline: 1px solid rgb(var(--color-primary-500) / 1);
		box-shadow: 0px 0px 7px 1px rgb(var(--color-primary-500) / 1);
	}
</style>
