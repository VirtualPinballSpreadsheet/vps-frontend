<script lang="ts">
	import { base } from '$app/paths';
	import HorizontalSlider from '$lib/components/HorizontalSlider.svelte';

	import TableCard from '$lib/components/cards/TableCard.svelte';
	import TableCardPlaceholder from '$lib/components/cards/TableCardPlaceholder.svelte';
	import FileCardPlaceholder from '$lib/components/cards/FileCardPlaceholder.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { modeMapping } from '$lib/helper/modeMapping';
	import { Search } from '$lib/stores/SearchStore';
	import type { TableFile } from '$lib/types/VPin';

	const { sortedFilesStore } = Search;

	const slides = 20;
	const dummy = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	// $: tables = [];
	$: tables = (($sortedFilesStore?.tableFiles || []) as TableFile[])
		.slice(0, slides)
		.map((t) => ({ file: t, href: `?game=${t.game?.id}&fileType=table&fileId=${t.id}` }));
</script>

<div class="h-full flex flex-col py-4 md:p-10 gap-10 md:gap-20 relative z-0">
	<HorizontalSlider
		title="Tables"
		component={tables?.length ? TableCard : TableCardPlaceholder}
		data={tables?.length ? tables : dummy}
		size={400}
		gap={2.5}
		num={($sortedFilesStore?.tableFiles || dummy).length}
		href="{base}/tables/"
	/>

	{#each Object.entries(modeMapping) as [key, val]}
		<!-- {@const data = []} -->
		{@const data = ($sortedFilesStore?.[key] || []).slice(0, slides).map((file) => ({
			file,
			href: `?game=${file.game?.id}&fileType=${key}&fileId=${file.id}`,
			fileType: key
		}))}
		{#if !['tableFiles', 'game'].includes(key)}
			<HorizontalSlider
				href="{base}/{val.route}/"
				title={val.name}
				component={data?.length ? val.component : FileCardPlaceholder}
				num={($sortedFilesStore?.[key] || dummy).length}
				data={data?.length ? data : dummy}
			/>
		{/if}
	{/each}
	<Footer />
</div>

<style>
</style>
