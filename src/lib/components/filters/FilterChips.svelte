<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import type { ChipFilterState } from '$lib/types/Filter';
	import AutoCompleteChips from '../AutoCompleteChips.svelte';

	export let store: Writable<ChipFilterState>;
	export let title = '???';
	// Offer the Exclude (negate) toggle
	export let allowNegate = false;
	// Offer the "first author only" toggle (Author filter)
	export let allowFirstOnly = false;
</script>

<div class="flex flex-col gap-4 flex-1">
	<SlideToggle size="sm" active="variant-filled-primary" name="slide" bind:checked={$store.active}
		>{title}</SlideToggle
	>
	{#if $store.active}
		{#if allowFirstOnly}
			<div
				title="Match only the first author of each file — the one who did the latest work — instead of the whole chain of past authors it is based on."
			>
				<SlideToggle
					size="sm"
					active="variant-filled-primary"
					name="firstOnly"
					bind:checked={$store.firstOnly}>First author only</SlideToggle
				>
			</div>
		{/if}
		{#if allowNegate}
			<div title="Keep results that match NONE of the selected values.">
				<SlideToggle
					size="sm"
					active="variant-filled-error"
					name="negate"
					bind:checked={$store.negate}>Exclude</SlideToggle
				>
			</div>
		{/if}
		<AutoCompleteChips bind:value={$store.value} options={$store.options} />
	{/if}
</div>
