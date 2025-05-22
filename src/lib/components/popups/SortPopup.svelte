<script>
	import { Search } from '$lib/stores/SearchStore';
	const { sortBy, isSearchActive } = Search;

	import { sortOptions } from '$lib/types/Filter';
</script>

<style>
	.sort-active {
		font-weight: bolder;
	}
</style>

<div class="card 8 shadow-xl popup" data-popup="popupSort">
	<div class="p-4">
		{#each sortOptions as sort}
			{#if sort.sortBy == 'search' && !$isSearchActive}
				<!-- no option for search sort -->
			{:else}
				<label class="flex items-center space-x-2">
					<input class="hidden" type="radio" name="sortBy" value={sort.sortBy} bind:group={$sortBy} />
					<p class:sort-active={$sortBy == sort.sortBy}>{sort.name}</p>
				</label>
			{/if}
		{/each}
	</div>
</div>
