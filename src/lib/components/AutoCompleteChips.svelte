<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import InputChip from '$lib/components/InputChip.svelte';
	import { nanoid } from 'nanoid';

	export let value: string[] = [];
	export let options: { label: string; value: string }[] = [];
	export let placeholder = '';
	export let restrict = false;

	let inputChip = '';
	const id = nanoid();

	let el: Element;

	$: popupSettings = {
		event: 'focus-click',
		target: id,
		placement: 'bottom'
	};
</script>

<div use:popup={popupSettings} bind:this={el} class="w-full">
	<InputChip
		bind:input={inputChip}
		bind:value
		name="chips"
		{placeholder}
		chips="variant-filled-primary"
	/>
	<div
		class="card max-h-48 p-4 overflow-y-auto z-50"
		style="width:{el?.clientWidth || 100}px"
		tabindex="-1"
		data-popup={id}
	>
		<Autocomplete
			bind:input={inputChip}
			{options}
			denylist={value}
			on:selection={(e) => {
				value.push(e.detail.value);
				value = value;
				inputChip = '';
			}}
		/>
	</div>
</div>
