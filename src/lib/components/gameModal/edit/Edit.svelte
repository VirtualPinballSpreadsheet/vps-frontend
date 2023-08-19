<script lang="ts">
	import type { Game } from '$lib/types/VPin';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import FileSection from './FileSection.svelte';
	import Table from './Table.svelte';
	import B2s from './B2s.svelte';
	import File from './File.svelte';

	export let game: Game;

	let cache: Game;
	onMount(() => {
		cache = JSON.parse(JSON.stringify(game));
	});
</script>

{#if cache}
	<Header game={cache} />
	<FileSection title="Tables" files={cache.tableFiles} component={Table} />
	<FileSection title="Backglasses" files={cache.b2sFiles} component={B2s} />
	<FileSection title="Roms" files={cache.romFiles} component={File} />
	<FileSection title="PuP Packs" files={cache.pupPackFiles} component={File} />
	<FileSection title="Alt. Color" files={cache.altColorFiles} component={File} />
	<FileSection title="Alt. Sound" files={cache.altSoundFiles} component={File} />
	<FileSection title="POV" files={cache.povFiles} component={File} />
	<FileSection title="Wheelart" files={cache.wheelArtFiles} component={File} />
	<FileSection title="Topper" files={cache.topperFiles} component={File} />
	<FileSection title="Pinball X Sound" files={cache.soundFiles} component={File} />
	<FileSection title="Media packs" files={cache.mediaPackFiles} component={File} />
	<FileSection title="Rules" files={cache.ruleFiles} component={File} />
{/if}
