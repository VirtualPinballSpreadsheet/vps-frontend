<script lang="ts">
	import HelpIcon from '$lib/components/HelpIcon.svelte';
	import { formatDate } from '$lib/helper/formatDate';
	import { Edit } from '$lib/stores/EditStore';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import EditItem from './EditItem.svelte';
	const toastStore = getToastStore();
	const { editStore, submitChanges } = Edit;

	let loading = false;

	const onSubmit = async () => {
		loading = true;
		const res = await submitChanges();
		toastStore.trigger({
			message: `${res.uploaded.length} changes submitted. ${res.notUploaded.length} changes not submitted.`,
			background: 'variant-filled-success'
		});
		loading = false;
	};
</script>

<div class="flex flex-col gap-2">
	<HelpIcon>
		<h4 class="h4">Edits <span class="opacity-60 ml-2">{$editStore.edits.length}</span></h4>
		<p slot="help">
			Your local changes. Once your done with your editing session, submit them to the database. You
			don't have to submit after every single change! The changes will be published once you update
			the database.
		</p>
	</HelpIcon>
	{#each $editStore.edits as edit}
		<EditItem {edit} />
		<hr />
	{/each}

	<button
		class="btn variant-filled-secondary"
		on:click={onSubmit}
		disabled={loading || !$editStore.edits.length}
	>
		{#if loading}
			<ProgressRadial
				stroke={60}
				meter="stroke-tertiary-500"
				track="stroke-tertiary-500/30"
				width="w-6"
			/>
		{:else}
			Submit Changes
		{/if}
	</button>
</div>
