<script lang="ts">
	import VirtualGrid from '$lib/components/VirtualGrid.svelte';

	export let title = '???';
	export let component: ConstructorOfATypedSvelteComponent;
	export let data: any[] = [];
	export let transformData = (d: any) => d;
</script>

<div class="pt-4 px-6 md:p-10 md:pb-0 flex items-end gap-4">
	<h2 class="h2">{title}</h2>
	<p class="font-bold" style="line-height:1.6rem;">{data.length} results</p>
</div>
<div class="p-6 md:p-10">
	<VirtualGrid 
		items={data} 
		{component} 
		{transformData}
		bufferRows={3}
	/>
</div>
