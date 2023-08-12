<script lang="ts">
	import { EmptyGame, EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import { quadInOut } from 'svelte/easing';
	import { formatDate } from '$lib/helper/formatDate';
	import { DB } from '$lib/stores/DbStore';
	const { dbStore } = DB;

	export let table = EmptyTableFile;
	export let href = '';

	$: game = table?.game?.id ? $dbStore[table.game.id] : EmptyGame;

	let el: Element;

	let left = 0;
	let top = 0;
	let height = 0;
	let width = 0;
	let hovered = false;
	let fadeOut = false;

	const duration = 100;

	const onMouseEnter = () => {
		const rect = el.getBoundingClientRect();
		left = rect.left;
		top = rect.top;
		width = rect.width;
		height = rect.height;
		hovered = true;
	};

	const onMouseLeave = () => {
		hovered = false;
		fadeOut = true;
	};

	const img = (node, { duration }) => {
		return {
			duration,
			css: (t) => {
				const eased = quadInOut(t);

				return `
					transform: scale(${1 - eased * 0.25}) translateY(${eased * -10}rem);
					`;
			}
		};
	};
	const card = (node, { duration }) => {
		return {
			duration,
			css: (t) => {
				const eased = quadInOut(t);

				return `
					transform: scale(${eased});
					`;
			}
		};
	};
</script>

<a class="wrapper" {href} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	{#if hovered}
		<div
			style="left:{left}px;top:{top}px;width:{width}px;height:{height}px"
			class="popup fixed z-50"
		>
			<img
				src={table.imgUrl || Placeholder}
				alt={table.id}
				transition:img={{ duration }}
				on:outroend={() => (fadeOut = false)}
				class="card pinImage bg-surface-600 z-10 absolute top-0 left-0 right-0 bottom-0 shadow-lg shadow-black"
			/>
			<div
				transition:card={{ duration }}
				class="card shadow-2xl shadow-black absolute top-0 -left-4 -right-4 -bottom-20 -z-1 flex flex-col p-4 gap-0.5"
				style="padding-top:130%"
			>
				<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden text-lg">
					{game?.name}
				</p>

				<div class="flex gap-1">
					<p>{game.manufacturer}</p>
					<p>({game.year})</p>
				</div>

				<p class="opacity-40 text-ellipsis whitespace-nowrap overflow-hidden">
					{table.authors.join(', ')}
				</p>
				<div class="flex gap-2 mt-4 flex-wrap">
					{#each table.features || [] as feature}
						<div class="badge variant-filled-surface">{feature.toUpperCase()}</div>
					{/each}
				</div>
				<div class="flex justify-between mt-auto">
					<div class="badge badge-glass">
						{table.tableFormat}
					</div>
					<p class=" opacity-40">{formatDate(table.updatedAt)}</p>
				</div>
			</div>
		</div>
	{/if}

	<img
		src={table.imgUrl || Placeholder}
		alt={table.id}
		class:hide={hovered || fadeOut}
		bind:this={el}
		class="card pinImage bg-surface-600"
	/>
	<div class="dummy" class:hide={!hovered} />
	<div class="flex flex-col p-4">
		<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{table.game?.name}</p>
		<p class="opacity-40 text-ellipsis whitespace-nowrap overflow-hidden">
			{table.authors.join(', ')}
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

	.dummy {
		aspect-ratio: 9/16;
		width: 100%;
		height: auto;
	}

	.hide {
		display: none;
	}

	/* POPUP */

	.popup {
		.pinImage {
			transform: scale(0.75) translateY(-10rem);
		}
	}
</style>
