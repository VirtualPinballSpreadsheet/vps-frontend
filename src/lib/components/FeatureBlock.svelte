<script lang="ts">
	export let data: string[] = [];
</script>

{#if data?.length}
	<div class="flex gap-1 flex-wrap">
		{#each data || [] as d}
			<div class="badge variant-ghost-primary px-1.5 py-0.5">{d.toUpperCase()}</div>
		{/each}
	</div>
{/if}
