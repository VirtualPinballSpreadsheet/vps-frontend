<script lang="ts">
	import { colorMap } from '$lib/helper/colorMap';

	export let data: string[] = [];
</script>

{#if data?.length}
	<div class="flex gap-1 flex-wrap">
		{#each data || [] as d}
			<div class="badge variant-ringed-surface px-1.5 py-0.5">
				<span class="rounded-full h-2 w-2 {colorMap[d] || 'bg-slate-500'} mr-2" />{d.toUpperCase()}
			</div>
		{/each}
	</div>
{/if}
