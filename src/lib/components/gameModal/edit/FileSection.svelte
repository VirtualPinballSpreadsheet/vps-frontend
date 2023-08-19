<script lang="ts">
	import type { FileUpload } from '$lib/types/VPin';
	import { faAdd } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';

	export let files: FileUpload[] = [];
	export let title = '???';
	export let component: ConstructorOfATypedSvelteComponent;
</script>

<div class="flex flex-col gap-4">
	<h3 class="h3 flex gap-2">{title}</h3>
	{#each files as file (file.id)}
		<svelte:component
			this={component}
			{file}
			onDelete={() => {
				files = files.filter((f) => f.id !== file.id);
			}}
		/>
	{/each}

	<button
		class="btn variant-ghost-tertiary self-end flex gap-4"
		on:click={() => {
			files.push({
				id: nanoid(10),
				createdAt: new Date().getTime(),
				updatedAt: new Date().getTime()
			});
			files = files;
		}}><Fa icon={faAdd} /> Add new {title}</button
	>
</div>
