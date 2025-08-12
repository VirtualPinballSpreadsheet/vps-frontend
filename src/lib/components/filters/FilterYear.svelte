<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	export let store: Writable<{
		value: [number, number];
		range: [number, number];
		active: boolean;
	}>;
	export let title = 'Year';

	function setMinLive(e: Event) {
		const s = $store;
		let min = Number((e.target as HTMLInputElement).value) || s.range[0];
		store.set({ ...s, value: [min, s.value[1]], active: true });
	}

	function setMaxLive(e: Event) {
		const s = $store;
		let max = Number((e.target as HTMLInputElement).value) || s.range[1];
		store.set({ ...s, value: [s.value[0], max], active: true });
	}

	function fixOrder() {
		const s = $store;
		let [min, max] = s.value;
		if (min > max) {
			[min, max] = [Math.min(min, max), Math.max(min, max)];
			store.set({ ...s, value: [min, max] });
		}
	}
</script>

<div class="flex flex-col gap-4 flex-1">
	<SlideToggle size="sm" active="variant-filled-primary" name="slide" bind:checked={$store.active}>
		{title}
	</SlideToggle>

	{#if $store.active}
		<div class="flex items-center gap-2">
			<input
				type="number"
				class="input input-filled w-24"
				min={$store.range[0]}
				max={$store.range[1]}
				value={$store.value[0]}
				on:input={setMinLive}
				on:blur={fixOrder}
			/>
			<span>–</span>
			<input
				type="number"
				class="input input-filled w-24"
				min={$store.range[0]}
				max={$store.range[1]}
				value={$store.value[1]}
				on:input={setMaxLive}
				on:blur={fixOrder}
			/>
		</div>
	{/if}
</div>
