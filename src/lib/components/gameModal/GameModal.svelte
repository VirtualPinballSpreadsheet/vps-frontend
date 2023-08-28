<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { DB } from '$lib/stores/DbStore';
	import { EmptyGame, type Game } from '$lib/types/VPin';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import { FastAverageColor } from 'fast-average-color';
	import View from './view/View.svelte';
	import Edit from './edit/EditView.svelte';

	const { dbStore } = DB;
	const modalStore = getModalStore();

	$: id = $page?.url?.searchParams?.get('game');
	$: fileId = $page.url.searchParams.get('fileId');
	$: editMode = $page.url.searchParams.get('edit');
	$: game = ((id ? $dbStore[id] : EmptyGame) || EmptyGame) as Game;

	$: {
		if (!fileId) break $;
		setTimeout(() => {
			const el = document.getElementById(fileId!);
			console.log(el);
			el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}, 100);
	}

	let color1 = 'rgba(var(--color-tertiary-500) / 0.1)';
	let color2 = 'rgba(var(--color-primary-500) / 0.1)';
	const fac = new FastAverageColor();

	$: {
		if (game.imgUrl) {
			fac.getColorAsync(game.imgUrl, { left: 0, width: 80 }).then((color) => {
				color1 = color.rgba.replace(',1)', ',0.6)');
			});
			fac.getColorAsync(game.imgUrl, { left: 200, width: 80 }).then((color) => {
				color2 = color.rgba.replace(',1)', ',0.6)');
			});
		}
	}

	onDestroy(() => {
		modalStore.clear();
		goto($page.url.pathname);
	});
</script>

<div
	class="card rounded-none md:rounded-md p-4 md:p-8 md:py-10 w-full max-w-6xl flex flex-col gap-6 md:gap-12 bg-top"
	style="background-image: radial-gradient(
	at 0% -40%,
	{color1} 0px,
	transparent 50%
),
radial-gradient(at 98% -40%, {color2} 0px, transparent 50%);"
>
	{#if editMode}
		<Edit />
	{:else}
		<View {game} />
	{/if}
</div>
