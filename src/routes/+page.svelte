<script lang="ts">
	import HorizontalSlider from '$lib/components/HorizontalSlider.svelte';
	import B2sCard from '$lib/components/cards/B2sCard.svelte';
	import FileCard from '$lib/components/cards/FileCard.svelte';
	import TableCard from '$lib/components/cards/TableCard.svelte';
	import { Search } from '$lib/stores/SearchStore';
	import type { B2SFile, PuPPackFile, RomFile, TableFile, TopperFile } from '$lib/types/VPin';

	const { sortedFilesStore } = Search;

	const slides = 20;

	$: tables = (($sortedFilesStore?.tableFiles || []) as TableFile[])
		.slice(0, slides)
		.map((t) => ({ table: t, href: `tables/${t.game?.id}/` }));
	$: b2ss = (($sortedFilesStore?.b2sFiles || []) as B2SFile[])
		.slice(0, slides)
		.map((b2s) => ({ b2s }));
	$: pupPacks = (($sortedFilesStore?.pupPackFiles || []) as PuPPackFile[])
		.slice(0, slides)
		.map((file) => ({ file }));
	$: roms = (($sortedFilesStore?.romFiles || []) as RomFile[])
		.slice(0, slides)
		.map((file) => ({ file }));
	$: toppers = (($sortedFilesStore?.topperFiles || []) as TopperFile[])
		.slice(0, slides)
		.map((file) => ({ file }));
</script>

<div class="h-full flex flex-col p-10 gap-20">
	<HorizontalSlider title="Tables" component={TableCard} data={tables} href="tables/" />
	<HorizontalSlider title="Backglasses" component={B2sCard} data={b2ss} size={8} />
	<HorizontalSlider title="PuP Packs" component={FileCard} data={pupPacks} size={8} />
	<HorizontalSlider title="Roms" component={FileCard} data={roms} size={8} />
	<HorizontalSlider title="Topper" component={FileCard} data={toppers} size={8} />
</div>

<style>
</style>
