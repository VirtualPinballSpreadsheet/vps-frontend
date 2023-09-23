<script lang="ts">
	import { EmptyGame, EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import TableCardHover from './TableCardHover.svelte';
	import { DB } from '$lib/stores/DbStore';
	import { mobile } from '$lib/helper/mobile';
	const { dbStore } = DB;

	export let file = EmptyTableFile;

	$: game = file?.game?.id ? $dbStore[file.game.id] : EmptyGame;
	export let href = '';

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
		if ($mobile.mobile) return;
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
		if ($mobile.mobile) return;
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

<a
	class="wrapper relative z-0"
	{href}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	id={file.id}
	data-gameid={file.game?.id}
	data-filetype="tableFiles"
>
	{#if hovered}
		<TableCardHover table={file} {left} {top} {width} {height} onEnd={() => (fadeOut = false)} />
	{/if}

	<img
		src={file.imgUrl || Placeholder}
		alt={file.id}
		class:hide={hovered || fadeOut}
		bind:this={el}
		class="card pinImage bg-surface-300-600-token"
	/>
	<div class="flex flex-col py-4">
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
	}

	.hide {
		opacity: 0;
	}
</style>
