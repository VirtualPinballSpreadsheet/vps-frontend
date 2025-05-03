<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { nanoid } from 'nanoid';
	export let content = '';

	const id = nanoid(10);
	const popupHover: PopupSettings = {
		event: 'hover',
		target: id,
		placement: 'top'
	};
</script>

{#if content}
	<div use:popup={popupHover}>
		<slot />
	</div>
	<div
		class="card px-2 py-1 variant-filled-surface z-50 border-primary-500 border shadow-md"
		data-popup={id}
	>
		<p>{content}</p>
		<div class="arrow variant-filled-surface border-primary-500 border-r border-b" />
	</div>
{:else}
	<slot />
{/if}
