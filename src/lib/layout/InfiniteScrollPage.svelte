<script lang="ts">
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';

	export let title = '???';
	export let component: ConstructorOfATypedSvelteComponent;
	export let data: any[] = [];
	export let pageSize = 100;
	export let transformData = (d: any) => d;

	let hasMore = true;
	let page = 2;

	$: {
		data;
		page = 1;
		hasMore = true;
	}
</script>

<div class="pt-4 px-6 md:p-10 md:pb-0 flex items-end gap-4">
	<h2 class="h2">{title}</h2>
	<p class="font-bold" style="line-height:1.6rem;">{data.length} results</p>
</div>
<div class="grid layout gap-y-10 gap-x-4 p-6 md:gap-x-10 md:gap-y-20 md:p-10">
	{#each { length: page } as _, i}
		{#each { length: pageSize } as _, j}
			{#if data.length > i * pageSize + j}
				{@const d = data[i * pageSize + j]}
				<svelte:component this={component} {...transformData(d)} />
			{/if}
		{/each}
	{/each}
</div>
<InfiniteScroll
	{hasMore}
	elementScroll={document.getElementById('page')}
	threshold={100}
	on:loadMore={() => {
		page++;
		if (page * pageSize > data.length) hasMore = false;
	}}
/>

<style>
	.layout {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	}
	@media (min-width: 768px) {
		.layout {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
