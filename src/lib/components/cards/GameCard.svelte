<script lang="ts">
	import { EmptyGame } from '$lib/types/VPin';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import GameCardHover from './GameCardHover.svelte';

	export let file = EmptyGame;

	export let href = '';

	$: formats = Array.from(
		new Set((file.tableFiles || []).map((t) => t.tableFormat).filter((f) => !!f))
	);

	let el: Element;

	let left = 0;
	let top = 0;
	let height = 0;
	let width = 0;
	let hovered = false;
	let fadeOut = false;

	const delay = 200;

	let timeout: NodeJS.Timeout | undefined;

	const onMouseEnter = () => {
		const rect = el.getBoundingClientRect();
		left = rect.left;
		top = rect.top;
		width = rect.width;
		height = rect.height;
		document.getElementById('page')?.addEventListener('scroll', onMouseLeave);
		timeout = setTimeout(() => {
			hovered = true;
			timeout = undefined;
		}, delay);
	};

	const onMouseLeave = () => {
		document.getElementById('page')?.removeEventListener('scroll', onMouseLeave);
		if (timeout) {
			hovered = false;
			clearTimeout(timeout);
		} else if (hovered) {
			hovered = false;
			fadeOut = true;
		}
	};
</script>

<a class="wrapper relative z-0" {href} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	{#if hovered}
		<GameCardHover game={file} {left} {top} {width} {height} onEnd={() => (fadeOut = false)} />
	{/if}

	<img
		src={getBackglassUrl(file)}
		alt={file.name}
		class:hide={hovered || fadeOut}
		bind:this={el}
		class="card pinImage bg-surface-300-600-token"
	/>
	<div class="flex flex-col py-4">
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
			{file.designers?.join(', ')}
		</p>
	</div>
</a>

<style lang="scss">
	.pinImage {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
		z-index: 100;
	}

	.hide {
		opacity: 0;
	}
</style>
