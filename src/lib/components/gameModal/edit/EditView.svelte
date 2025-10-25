<script lang="ts">
	import type { Game } from '$lib/types/VPin';
	import { onDestroy, onMount } from 'svelte';
	import Header from './Header.svelte';
	import FileSection from './FileSection.svelte';
	import Table from './Table.svelte';
	import Tutorials from './Tutorials.svelte';
	import B2s from './B2s.svelte';
	import File from './File.svelte';
	import Rom from './Rom.svelte';
	import { Edit } from '$lib/stores/EditStore';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import ColoredRoms from './ColoredRoms.svelte';
	import { Paste, PasteTutorial, PasteROM, PasteB2S, PasteTable, PasteWheel } from '$lib/helper/paste';
	const modalStore = getModalStore();
	const { saveEdit, editStore } = Edit;

	$: cache = $editStore.cache?.data;
	let loaded = false;

	onMount(() => {
		modalStore._close = modalStore.close;
		modalStore.close = () => {};
		setTimeout(() => {
			loaded = true;
		}, 100);
	});

	onDestroy(() => {
		if (modalStore._close) modalStore.close = modalStore._close;
	});
</script>

{#if cache && loaded}
	<Header bind:game={cache} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Tables" bind:files={cache.tableFiles} paste={new PasteTable()} component={Table} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Backglasses" bind:files={cache.b2sFiles} paste={new PasteB2S()} component={B2s} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Tutorials" bind:files={cache.tutorialFiles} paste={new PasteTutorial()} component={Tutorials} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Roms" bind:files={cache.romFiles} paste={new PasteROM()} component={Rom} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="PuP Packs" bind:files={cache.pupPackFiles} paste={new Paste("pupPackFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Colored Roms" bind:files={cache.altColorFiles} paste={new Paste("altColorFiles")} component={ColoredRoms} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Alt. Sound" bind:files={cache.altSoundFiles} paste={new Paste("altSoundFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="POV" bind:files={cache.povFiles} paste={new Paste("povFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Wheelart" bind:files={cache.wheelArtFiles} paste={new PasteWheel()} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Topper" bind:files={cache.topperFiles} paste={new Paste("topperFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Pinball X Sound" bind:files={cache.soundFiles} paste={new Paste("soundFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Media packs" bind:files={cache.mediaPackFiles} paste={new Paste("mediaPackFiles")} component={File} />
	<hr class="-mx-2 md:-mx-8" />
	<FileSection title="Rules" bind:files={cache.ruleFiles} paste={new Paste("ruleFiles")} component={File} />

	<hr class="-mx-2 md:-mx-8" />

	<div class="flex justify-end w-full gap-4">
		<button
			class="btn variant-ghost-secondary"
			on:click={() => {
				modalStore._close();
			}}>Cancel</button
		>
		<button
			class="btn variant-filled-primary w-60"
			on:click={() => {
				saveEdit();
				modalStore._close();
			}}>Save</button
		>
	</div>
{:else}
	<div class="w-full h-screen flex items-center justify-center">
		<ProgressRadial stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
	</div>
{/if}
