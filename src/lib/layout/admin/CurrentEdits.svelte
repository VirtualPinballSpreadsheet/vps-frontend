<script lang="ts">
	import HelpIcon from '$lib/components/HelpIcon.svelte';
	import { formatDate } from '$lib/helper/formatDate';
	import { Edit } from '$lib/stores/EditStore';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import EditItem from './EditItem.svelte';
	import { User } from '$lib/stores/UserStore';
	const toastStore = getToastStore();
	const { editStore, submitChanges } = Edit;
	const { updateDb } = User;
	let loading = false;

	const onSubmit = async () => {
		loading = true;
		const res = await submitChanges();
		await updateDb();
		toastStore.trigger({
			message: `${res.uploaded.length} changes submitted. ${res.notUploaded.length} changes not submitted.`,
			background: 'variant-filled-success'
		});
		loading = false;
	};

	const clearAll = () => {
		Edit.deleteEdit($editStore.edits);
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

	{#if $editStore.edits.length}
		<button class="btn variant-soft-error" on:click={clearAll}>Clear all</button>
	{/if}

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
