<script lang="ts">
	import type { FileUpload } from '$lib/types/VPin';
	import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { Paste } from '$lib/helper/paste';
	import AddButton from './AddButton.svelte';

	export let files: FileUpload[] | undefined;
	export let paste: Paste | undefined = undefined;
	export let title = '???';
	export let component: ConstructorOfATypedSvelteComponent;

	export let open = false;
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<button on:click={() => (open = !open)} class="h3 flex gap-2 items-center"
			>{title} <span class="opacity-40">{files?.length || 0}</span><Fa
				icon={open ? faChevronUp : faChevronDown}
				size="12"
			/></button
		>

		<AddButton bind:files={files} bind:paste={paste} bind:title={title} bind:open={open} />
	</div>

	{#if open}
		{#if files?.length}
			{#each files as file (file.id)}
				<svelte:component
					this={component}
					{file}
					onDelete={() => {
						//@ts-ignore
						files = files.filter((f) => f.id !== file.id);
					}}
					paste={paste}
				/>
			{/each}
		{/if}
	{/if}
</div>
