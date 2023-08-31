<script lang="ts">
	import type { FileUpload } from '$lib/types/VPin';
	import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';

	export let files: FileUpload[] | undefined;
	export let title = '???';
	export let component: ConstructorOfATypedSvelteComponent;

	export let open = false;
</script>

<div class="flex flex-col gap-4">
	<button on:click={() => (open = !open)} class="h3 flex gap-2 items-center"
		>{title} <span class="opacity-40">{files?.length || 0}</span><Fa
			icon={open ? faChevronUp : faChevronDown}
			size="12"
		/></button
	>

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
				/>
			{/each}
		{/if}

		<button
			class="btn variant-ghost-tertiary self-end flex gap-4"
			on:click={() => {
				if (!files) files = [];
				//@ts-ignore
				files.push({
					id: nanoid(10),
					createdAt: new Date().getTime(),
					updatedAt: new Date().getTime()
				});
				files = files;
			}}><Fa icon={faAdd} /> Add new {title}</button
		>
	{/if}
</div>
