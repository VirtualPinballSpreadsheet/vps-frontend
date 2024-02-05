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

	export let data: PageData;
	let { tindex, gindex } = data;
	const { tournamentStore } = Tournaments;
	$: tournament = $tournamentStore.length >= tindex ? $tournamentStore[tindex] : undefined;
	$: game = (tournament?.games?.length || -1) >= gindex ? tournament?.games[gindex] : undefined;

	let inputDemo = '';

	const onAdd = () => {
		// if (!tournament) return;
		// $tournamentStore[tindex].games.push({ balls: 3, points: {}, scores: {}, gameId: '' });
		// goto(tindex + '/' + tournament.games.length);
	};

	const flavorAllowlist: string[] = ['neapolitan', 'pineapple', 'peach'];
	const flavorOptions: any[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];
	function onFlavorSelection(event: CustomEvent<any>): void {
		inputDemo = event.detail.label;
	}
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

{#if game && tournament}
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
				on:click={() => {
					goto(tindex + '/edit');
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
			<div data-popup="popupAutocomplete">
				<Autocomplete
					bind:input={inputDemo}
					options={flavorOptions}
					on:selection={onFlavorSelection}
				/>
			</div>
			<button
				class="btn btn-icon-lg flex gap-4 items-center"
				on:click={() => {
					goto(tindex + '/edit');
				}}
			>
				<Fa icon={faForwardStep} />
			</button>
		</div>
		<img src={Placeholder} alt={''} class="card aspectTable rounded" />
		<div class="flex gap-4 items-center">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">Balls</div>
				<input type="number" placeholder="1234567890" bind:value={game.balls} />
			</div>
			<SlideToggle
				size="sm"
				class="md:pt-6"
				active="variant-filled-primary"
				name="slide"
				bind:checked={$tournamentStore[tindex].vpin}>VPin</SlideToggle
			>
		</div>
		<hr />
		{#each tournament.players as player}
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim w-[8rem]">{player}</div>
				<input type="number" placeholder="1234567890" bind:value={game.scores[player]} />
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
