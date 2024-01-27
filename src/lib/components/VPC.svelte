<script lang="ts">
	import type { VPC } from '$lib/types/VPC';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import { DB } from '$lib/stores/DbStore';
	import type { Game } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import FileIcons from './FileIcons.svelte';
	import { formatDate } from '$lib/helper/formatDate';
	import Fa from 'svelte-fa';
	import { faDiscord } from '@fortawesome/free-brands-svg-icons';
	import { numberWithCommas } from '$lib/helper/numberWithCommas';

	export let data: VPC;

	const getTableImageUrl = (game?: Game, tableId?: string) => {
		if (!game?.tableFiles || !tableId) return Placeholder;
		for (let table of game.tableFiles) {
			if (table.id === tableId) return table.imgUrl;
		}
		return Placeholder;
	};

	const { getGame } = DB;
	$: game = getGame(data.vpsId);
	$: gameImage = getBackglassUrl(game);
	$: tableImage = getTableImageUrl(game, data.vpsId);
	$: scores = data.scores.slice(0, 10).sort((a, b) => b.score - a.score);
</script>

<div class="flex flex-col md:flex-row px-16 py-16 gap-0 md:gap-12 items-stretch overflow-clip">
	<!-- Challenge -->
	<div class="flex flex-col flex-1">
		<div class="text-sm opacity-40 font-bold uppercase">VPC Weekly Challenge</div>
		<div class="text-2xl font-bold">
			{game.name}
		</div>
		<div
			class="flex gap-2 p-2 items-center rounded bg-surface-200 dark:bg-surface-800 mr-auto mt-2"
		>
			<div class="badge p-0 leading-3">W{data.currentSeasonWeekNumber}</div>
			<div class="badge p-0 m-0 leading-3">
				{formatDate(data.periodStart)} -
				{formatDate(data.periodEnd)}
			</div>
		</div>

		<div class="flex gap-2 my-4">
			<a
				class="chip variant-soft-primary hover:variant-filled-primary flex items-center gap-2"
				href={data.tableUrl}
				target="_blank"><FileIcons fileType={'tableFiles'} />Table</a
			>
			<a
				class="chip variant-soft-secondary hover:variant-filled-secondary flex items-center gap-2"
				href={data.b2sUrl}
				target="_blank"><FileIcons fileType={'b2sFiles'} />B2S</a
			>
			<a
				class="chip variant-soft-tertiary hover:variant-filled-tertiary flex items-center gap-2"
				href={data.romUrl}
				target="_blank"><FileIcons fileType={'romFiles'} />ROM</a
			>
		</div>
		{#if data.notes}
			<div class="italic">{data.notes}</div>
		{/if}
		<div class="flex-1 w-full h-full" />
		<div class="bg-surface-200 dark:bg-surface-900 p-4 rounded flex flex-col gap-4">
			<div>
				Join the VPC weekly challenge on discord to compete with others on the table of the week!
			</div>
			<a
				class="btn variant-filled-primary mr-auto flex gap-2"
				href="https://discord.gg/MAB82JU4Cz"
				target="_blank"
			>
				<Fa icon={faDiscord} /> Join the discord
			</a>
		</div>
	</div>

	<!-- Highscore -->
	<div class="flex flex-col flex-1 gap-3 mt-3 md:mt-0">
		{#each scores.slice(0, 5) as score, i}
			<div
				class="flex gap-4 items-center bg-surface-50 dark:bg-surface-700 px-2 py-1 rounded-md"
				class:border={i === 0}
				class:border-primary-400={i === 0}
			>
				<img src={score.userAvatarUrl} class="rounded w-10 h-10" />
				<div class="flex flex-col flex-1">
					<div class="font-bold">
						{numberWithCommas(score.score)}
					</div>
					<div class="opacity-60">
						{score.username}
					</div>
				</div>
				<div class="opacity-20 text-right">{i + 1}</div>
			</div>
		{/each}
	</div>
	<div class="flex flex-col flex-1 gap-3 mt-3 md:mt-0 w-full">
		{#each scores.slice(5, 10) as score, i}
			<div class="flex gap-4 items-center bg-surface-50 dark:bg-surface-700 px-2 py-1 rounded-md">
				<img src={score.userAvatarUrl} class="rounded w-10 h-10" />
				<div class="flex flex-col flex-1">
					<div class="font-bold">
						{numberWithCommas(score.score)}
					</div>
					<div class="opacity-60">
						{score.username}
					</div>
				</div>
				<div class="opacity-20 text-right">{i + 6}</div>
			</div>
		{/each}
	</div>

	<!-- Table -->
	<div class="h-[20rem] md:h-[unset] w-[25rem] max-w-full flex flex-col items-center mt-8 md:mt-0">
		<div class="relative [perspective:600px] h-[15em] w-72">
			<div
				class="absolute top-0 w-72 h-72 p-2 bg-slate-500 dark:bg-slate-900 shadow-md border border-slate-700 flex flex-col gap-2"
			>
				<img src={gameImage} class="w-full [aspect-ratio:4/3] border border-slate-700" />
				<div class="flex gap-2 flex-1">
					<div
						class="speaker bg-slate-900 dark:bg-black aspect-square rounded-full border border-slate-700"
					/>
					<div class="my-2 bg-slate-900 dark:bg-black flex-1 border border-slate-700 flex">
						<div
							class=" flex-1 m-1 border border-orange-500 flex items-center justify-center font-mono text-orange-500"
						>
							INSERT COIN
						</div>
					</div>
					<div
						class="speaker bg-slate-900 dark:bg-black aspect-square rounded-full border border-slate-700"
					/>
				</div>
			</div>
			<div
				class="absolute top-[4.6rem] w-72 tablevpc bg-slate-500 dark:bg-slate-900 border border-slate-700 p-2"
			>
				<img src={tableImage} class="w-full [aspect-ratio:9/16" />
			</div>
		</div>
	</div>
</div>

<style>
	.tablevpc {
		transform: rotateX(98deg);
		box-shadow: inset 0 0 7px rgba(0, 0, 0, 1);
	}

	.speaker {
		box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
	}
</style>
