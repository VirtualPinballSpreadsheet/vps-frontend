<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import AutoCompleteChips from '../AutoCompleteChips.svelte';

	export let store: Writable<{
		value: string[];
		options: { label: string; value: string }[];
		active: boolean;
	}>;
	export let title = '???';
</script>

<div class="flex flex-col gap-4 flex-1">
	<SlideToggle size="sm" active="variant-filled-primary" name="slide" bind:checked={$store.active}
		>{title}</SlideToggle
	>
	{#if $store.active}
		<AutoCompleteChips bind:value={$store.value} options={$store.options} />
	{/if}
</div>
