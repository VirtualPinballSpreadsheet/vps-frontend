<!-- <script lang="ts">
	import LinkCard from '$lib/components/cards/LinkCard.svelte';
	import { Links } from '$lib/stores/LinksStore';

	const { linksStore } = Links;
</script>

<div class="pt-4 px-6 md:p-10 md:pb-0 flex items-end gap-4">
	<h2 class="h2">Links</h2>
	<p class="font-bold" style="line-height:1.6rem;">{$linksStore.length} results</p>
</div>
<div class="grid layout gap-y-10 gap-x-4 p-6 md:gap-x-10 md:gap-y-20 md:p-10">
	{#each $linksStore as link}
		<LinkCard file={link} />
	{/each}
</div>

<style>
	.layout {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	}
	@media (min-width: 768px) {
		.layout {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style> -->

<div class="p-10 text-md">Yea yea its still work in progress.... I know...</div>
