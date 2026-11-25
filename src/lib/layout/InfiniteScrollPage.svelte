<script lang="ts">
	import VirtualGrid from '$lib/components/VirtualGrid.svelte';
	import ResultTable from '$lib/components/ResultTable.svelte';
	import { viewMode } from '$lib/stores/ViewStore';
	import type { Mode } from '$lib/types/Filter';

	export let title = '???';
	export let mode: Mode = 'game';
	export let component: ConstructorOfATypedSvelteComponent;
	export let data: any[] = [];
	export let transformData = (d: any) => d;

	// rows deep-link exactly like the cards do
	const hrefFor = (item: any): string => transformData(item).href;
</script>

<div class="pt-4 px-6 md:p-10 md:pb-0 flex items-end gap-4">
	<h2 class="h2">{title}</h2>
	<p class="font-bold" style="line-height:1.6rem;">{data.length} results</p>
</div>
<div class="p-6 md:p-10">
	{#if $viewMode === 'table'}
		<!-- rows deep-link exactly like the cards do -->
		<ResultTable {mode} {hrefFor} items={data} />
	{:else}
		<VirtualGrid items={data} {component} {transformData} bufferRows={3} />
	{/if}
</div>
