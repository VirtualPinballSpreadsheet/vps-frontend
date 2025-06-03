<script lang="ts">
	import { EmptyGame } from '$lib/types/VPin';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import { FastAverageColor } from 'fast-average-color';
	import { mobile } from '$lib/helper/mobile';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { formatDate } from '$lib/helper/formatDate';

	const fac = new FastAverageColor();

	export let file = EmptyGame;
	export let href = '';

	let color = '';
	let hovered = false;

	$: bgImg = getBackglassUrl(file);

	$: formats = Array.from(
		new Set((file.tableFiles || []).map((t) => t.tableFormat).filter((f) => !!f))
	);

	$: {
		if (bgImg) {
			fac.getColorAsync(bgImg).then((_color) => {
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
>
	<!-- Hovered Card -->
	<div
		class="hoverCard card !bg-surface-100 dark:!bg-surface-600 shadow-2xl shadow-black absolute top-0 -left-4 -right-4 bottom-0 -z-1 flex flex-col p-4 gap-0.5 items-center"
		style="background: color-mix(in lch, rgb(var(--color-surface-{$modeCurrent
			? 100
			: 900})) {$modeCurrent ? 80 : 60}%, {color ||
			`rgb(var(--color-surface-${$modeCurrent ? 100 : 600})`}) !important;"
		class:hovered
	>
		<img
			src={bgImg}
			alt={file.id}
			style="height:36%;"
			class="absolute top-0 left-0 right-0 w-full bgImage z-0 object-cover opacity-10"
		/>

		<div
			class="flex flex-col max-w-full w-full absolute items-center p-2 bottom-0"
			style="top:calc(90% - 13rem)"
		>
			<div class="flex gap-2 max-w-full">
				<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.name}</p>
				{#each formats as format}
					<div class="badge badge-glass my-auto py-0.5 px-1">
						{format}
					</div>
				{/each}
			</div>

			<div class="flex gap-1 text-center max-w-full">
				<p class="text-ellipsis whitespace-nowrap overflow-hidden">{file.manufacturer}</p>
				<p>({file.year})</p>
			</div>

			<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
				{file.designers?.join(', ') || '-'}
			</p>
			<div class="flex gap-2 mt-4 flex-wrap">
				{#each file.theme || [] as theme}
					<div class="badge variant-filled-surface">{theme.toUpperCase()}</div>
				{/each}
			</div>
			<div class="flex mt-auto w-full">
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Updated at</p>
					<p class="">{formatDate(file.lastCreatedAt ?? file.updatedAt)}</p>
				</div>
				<div class="bg-surface-900-50-token h-full w-px opacity-20" />
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Type</p>
					<p class="">{file.type || '-'}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Img -->
	<img
		src={bgImg}
		alt={file.name}
		class:hovered
		class="card pinImage bg-surface-300-600-token shadow-black"
		class:shadow-lg={hovered}
	/>

	<!-- Main Text -->
	<div class="info flex flex-col py-4" class:opacity-0={hovered}>
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.name}</p>
			{#each formats as format}
				<div class="badge badge-glass my-auto py-0.5 px-1">
					{format}
				</div>
			{/each}
		</div>
		<p>{file.manufacturer} ({file.year})</p>
		<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
			{file.designers?.join(', ') || ''}
		</p>
	</div>
</a>

<style lang="scss">
	.pinImage {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
		z-index: 100;
		transition: all 100ms ease-in-out 100ms;

		&.hovered {
			transform: translateY(-8rem) scale(0.8);
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

	.hide {
		opacity: 0;
	}
</style>
