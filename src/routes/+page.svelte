<script lang="ts">
	import { base } from '$app/paths';
	import HorizontalSlider from '$lib/components/HorizontalSlider.svelte';
	import B2sCard from '$lib/components/cards/B2sCard.svelte';
	import FileCard from '$lib/components/cards/FileCard.svelte';
	import TableCard from '$lib/components/cards/TableCard.svelte';
	import { modeMapping } from '$lib/helper/modeMapping';
	import { Search } from '$lib/stores/SearchStore';
	import type {
		AltColorFile,
		AltSoundFile,
		B2SFile,
		MediaPackFile,
		POVFile,
		PuPPackFile,
		RomFile,
		RuleFile,
		SoundFile,
		TableFile,
		TopperFile,
		WheelArtFile
	} from '$lib/types/VPin';

	const { sortedFilesStore } = Search;

	const slides = 20;

	$: tables = (($sortedFilesStore?.tableFiles || []) as TableFile[])
		.slice(0, slides)
		.map((t) => ({ file: t, href: `?game=${t.game?.id}&fileType=table&fileId=${t.id}` }));
</script>

<div class="h-full flex flex-col py-4 md:p-10 gap-10 md:gap-20 relative z-0">
	<HorizontalSlider
		title="Tables"
		component={TableCard}
		data={tables}
		size={400}
		gap={2.5}
		num={($sortedFilesStore?.tableFiles || []).length}
		href="{base}/tables/"
	/>

	{#each Object.entries(modeMapping) as [key, val]}
		{@const data = ($sortedFilesStore?.[key] || [])
			.slice(0, slides)
			.map((file) => ({
				file,
				href: `?game=${file.game?.id}&fileType=${key}&fileId=${file.id}`,
				fileType: key
			}))}
		{#if !['tableFiles', 'game'].includes(key)}
			<HorizontalSlider
				href="{base}/{val.route}/"
				title={val.name}
				component={val.component}
				num={($sortedFilesStore?.[key] || []).length}
				{data}
			/>
		{/if}
	{/each}
	<div class="h-96 bg-surface-600 -m-10" />
</div>

<style>
</style>
