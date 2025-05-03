<script lang="ts">
	import { colorMap } from '$lib/helper/colorMap';
	import { FeatureDescriptions } from '$lib/types/Features';
	import Tooltip from './Tooltip.svelte';

	export let data: string[] = [];
</script>

{#if data?.length}
	<div class="flex gap-1 flex-wrap">
		{#each data || [] as d}
			<Tooltip
				content={FeatureDescriptions[d]}
			>
				<div class="badge variant-ringed-surface px-1.5 py-0.5">
					<span class="rounded-full h-2 w-2 {colorMap[d] || 'bg-slate-500'} mr-2" />{d.toUpperCase()}
				</div>
			</Tooltip>
		{/each}
	</div>
{/if}
