<script lang="ts">
	import type { Game } from '$lib/types/VPin';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import FileSection from './FileSection.svelte';
	import Table from './Table.svelte';
	import B2s from './B2s.svelte';
	import File from './File.svelte';
	import { Edit } from '$lib/stores/EditStore';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const { saveEdit, editStore } = Edit;

	$: cache = $editStore.cache?.data;
	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

{#if cache && loaded}
	<Header game={cache} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Tables" files={cache.tableFiles || []} component={Table} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Backglasses" files={cache.b2sFiles || []} component={B2s} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Roms" files={cache.romFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="PuP Packs" files={cache.pupPackFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Alt. Color" files={cache.altColorFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Alt. Sound" files={cache.altSoundFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="POV" files={cache.povFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Wheelart" files={cache.wheelArtFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Topper" files={cache.topperFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Pinball X Sound" files={cache.soundFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Media packs" files={cache.mediaPackFiles || []} component={File} />
	<hr class=" -mx-2 md:-mx-8" />
	<FileSection title="Rules" files={cache.ruleFiles || []} component={File} />

	<hr class=" -mx-2 md:-mx-8" />

	<div class="flex justify-end w-full gap-4">
		<button class="btn variant-ghost-secondary">Cancel</button>
		<button
			class="btn variant-filled-primary w-60"
			on:click={() => {
				saveEdit();
				modalStore.close();
			}}>Save</button
		>
	</div>
{:else}
	<div class="w-full h-screen flex items-center justify-center">
		<ProgressRadial stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
	</div>
{/if}
