<script lang="ts">
	import { EmptyGame, EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import { DB } from '$lib/stores/DbStore';
	import { mobile } from '$lib/helper/mobile';
	import { FastAverageColor } from 'fast-average-color';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import EditButton from '../EditButton.svelte';
	import FeatureBlock from '../FeatureBlock.svelte';
	import { formatDate } from '$lib/helper/formatDate';

	const fac = new FastAverageColor();
	const { dbStore } = DB;

	export let file = EmptyTableFile;
	export let href = '';

	let color = '';
	let hovered = false;

	$: game = file?.game?.id ? $dbStore[file.game.id] : EmptyGame;

	$: {
		if (file.imgUrl) {
			fac.getColorAsync(file.imgUrl).then((_color) => {
				if (_color) color = _color.rgb;
			});
		}
	}

	const onMouseEnter = () => {
		if ($mobile.mobile) return;
		hovered = true;
	};

	const onMouseLeave = () => {
		if ($mobile.mobile) return;
		hovered = false;
	};
</script>

<a
	class="wrapper relative z-0"
	{href}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	id={file.id}
	data-gameid={file.game?.id}
	data-filetype="tableFiles"
>
	<!-- Hovered Card -->
	<div
		style="background: color-mix(in lch, rgb(var(--color-surface-{$modeCurrent
			? 100
			: 900})) {$modeCurrent ? 80 : 60}%, {color ||
			`rgb(var(--color-surface-${$modeCurrent ? 100 : 600})`}) !important;"
		class:hovered
		class="card !bg-surface-100 dark:!bg-surface-600 shadow-2xl shadow-black absolute top-0 -left-4 -right-4 bottom-0 -z-1 flex flex-col p-4 gap-0.5 items-center hoverCard"
	>
		<img
			src={file.imgUrl || Placeholder}
			alt={file.id}
			style="height:35%;"
			class="absolute top-0 left-0 right-0 w-full bgImage z-0 object-cover opacity-60"
		/>

		<div
			class="flex flex-col max-w-full w-full absolute items-center p-4 gap-0.5 bottom-0"
			style="top:calc(88.5% - 14rem)"
		>
			<div class="flex gap-2 max-w-full">
				<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.game?.name}</p>
				<div class="badge badge-glass my-auto py-0.5 px-1">
					{file.tableFormat}
				</div>
				<EditButton {game} />
			</div>

			<div class="flex gap-1 text-center">
				<p class="text-ellipsis whitespace-nowrap overflow-hidden">{game.manufacturer}</p>
				<p>({game.year})</p>
			</div>

			<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full mb-4">
				{file.authors?.join(', ')}
			</p>

			<FeatureBlock data={file.features} />

			<div class="flex mt-auto w-full">
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Updated at</p>
					<p class="">{formatDate(file.updatedAt)}</p>
				</div>
				<div class="bg-surface-900-50-token h-full w-px opacity-20" />
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Added at</p>
					<p class="">{formatDate(file.createdAt || file.updatedAt)}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Main image -->
	<img
		src={file.imgUrl || Placeholder}
		alt={file.id}
		class:hovered
		class="card pinImage bg-surface-300-600-token shadow-black"
		class:shadow-lg={hovered}
	/>

	<!-- Main Text -->
	<div class="flex flex-col py-4 info" class:opacity-0={hovered}>
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.game?.name}</p>
			<div class="badge badge-glass my-auto py-0.5 px-1">
				{file.tableFormat}
			</div>
		</div>
		<p>{game.manufacturer} ({game.year})</p>
		<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
			{file.authors?.join(', ')}
		</p>
	</div>
</a>

<style lang="scss">
	.pinImage {
		aspect-ratio: 9/16;
		object-fit: cover;
		width: 100%;
		z-index: 100;
		transition: all 100ms ease-in-out 100ms;

		&.hovered {
			transform: translateY(-8rem) scale(0.75);
		}
	}

	.info {
		transition: opacity 100ms ease-in-out 100ms;
	}

	.hoverCard {
		transform: scale(0);
		transition: transform 100ms ease-in-out 100ms;
		&.hovered {
			transform: scale(1);
		}
	}

	.bgImage {
		clip-path: url(#myCurve);
	}
</style>
