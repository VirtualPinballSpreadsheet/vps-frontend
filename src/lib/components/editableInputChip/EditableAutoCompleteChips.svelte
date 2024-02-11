<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import EditableInputChip from '$lib/components/editableInputChip/EditableInputChip.svelte';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value: string[] = [];
	export let options: { label: string; value: string }[] = [];
	export let placeholder = '';
	export let restrict = false;

	let inputChip = '';
	const id = nanoid(10);

	let el: Element;

	$: popupSettings = {
		event: 'focus-click',
		target: id,
		placement: 'bottom'
	};
</script>

<div use:popup={popupSettings} bind:this={el} class="w-full">
	<EditableInputChip
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
			denylist={value || []}
			on:selection={(e) => {
				if (!Array.isArray(value)) value = [];
				value.push(e.detail.value);
				value = value;
				inputChip = '';
				dispatch('change', value);
			}}
		/>
	</div>
</div>
