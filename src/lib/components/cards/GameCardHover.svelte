<script lang="ts">
	import { EmptyGame, EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import { quadInOut } from 'svelte/easing';
	import { formatDate } from '$lib/helper/formatDate';
	import { DB } from '$lib/stores/DbStore';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';

	export let game = EmptyGame;

	$: formats = Array.from(
		new Set((game.tableFiles || []).map((t) => t.tableFormat).filter((f) => !!f))
	);

	export let left = 0;
	export let top = 0;
	export let height = 0;
	export let width = 0;
	export let onEnd = () => {};

	const duration = 100;

	const img = (node: Element, { duration, delay }: any) => {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = quadInOut(t);

				return `
					transform: translateY(${eased * -8}rem) scale(${1 - eased * 0.25});
					`;
			}
		};
	};
	const card = (node: Element, { duration, delay }: any) => {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = quadInOut(t);

				return `
					transform: scale(${eased});
					`;
			}
		};
	};
</script>

<div
	style="left:{left}px;top:{top}px;width:{width}px;height:{height}px"
	class="popup fixed z-50 pointer-events-none"
>
	<img
		src={getBackglassUrl(game)}
		alt={game.id}
		transition:img={{ duration }}
		on:outroend={onEnd}
		class="card pinImage bg-surface-100 dark:bg-surface-600 z-10 absolute top-0 left-0 right-0 bottom-0 shadow-lg shadow-black"
	/>
	<div
		transition:card={{ duration }}
		class="card !bg-surface-100 dark:!bg-surface-600 shadow-2xl shadow-black absolute top-0 -left-4 -right-4 -bottom-24 -z-1 flex flex-col p-4 gap-0.5 items-center"
	>
		<img
			src={getBackglassUrl(game)}
			alt={game.id}
			style="height:36%;"
			class="absolute top-0 left-0 right-0 w-full bgImage z-0 object-cover opacity-10"
		/>

		<div
			class="flex flex-col max-w-full w-full absolute items-center p-2 bottom-0"
			style="top:calc({height * 0.885}px - 7.5rem)"
		>
			<div class="flex gap-2 max-w-full">
				<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{game.name}</p>
				{#each formats as format}
					<div class="badge badge-glass my-auto py-0.5 px-1">
						{format}
					</div>
				{/each}
			</div>

			<div class="flex gap-1 text-center max-w-full">
				<p class="text-ellipsis whitespace-nowrap overflow-hidden">{game.manufacturer}</p>
				<p>({game.year})</p>
			</div>

			<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
				{game.designers?.join(', ') || '-'}
			</p>
			<div class="flex gap-2 mt-4 flex-wrap">
				{#each game.theme || [] as theme}
					<div class="badge variant-filled-surface">{theme.toUpperCase()}</div>
				{/each}
			</div>
			<div class="flex mt-auto w-full">
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Updated at</p>
					<p class="">{formatDate(game.updatedAt)}</p>
				</div>
				<div class="bg-surface-900-50-token h-full w-px opacity-20" />
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Type</p>
					<p class="">{game.type || '-'}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<svg width="0" height="0">
	<defs>
		<clipPath id="myCurve" clipPathUnits="objectBoundingBox">
			<path d="M 0,1 L 0,0 L 1,0 L 1,1 C .6 .8, .4, 1.2, 0 1 Z" />
		</clipPath>
	</defs>
</svg>

<style lang="scss">
	.pinImage {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
		z-index: 100;
		transform: translateY(-8rem) scale(0.75);
	}

	.bgImage {
		clip-path: url(#myCurve);
	}
</style>
