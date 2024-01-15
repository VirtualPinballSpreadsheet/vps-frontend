<script>
	import HelpIcon from '$lib/components/HelpIcon.svelte';
	import { formatDateTime } from '$lib/helper/formatDate';
	import { DB } from '$lib/stores/DbStore';
	import { User } from '$lib/stores/UserStore';
	import { faRefresh } from '@fortawesome/free-solid-svg-icons';
	import { Accordion, AccordionItem, ProgressRadial } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	const { lastUpdated } = DB;
	const { unpublishedChanges, pipelineState } = User;

	let loading = false;

	const onUpdate = async () => {
		loading = true;
		await User.updateDb();
		loading = false;
	};

	const onRefresh = async () => {
		loading = true;
		await User.getUnpublishedChanges();
		await User.getPipelineState();
		loading = false;
	};
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="summary">DB Debug</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="flex flex-col">
				<p class="flex gap-2 items-center pt-2">
					{$unpublishedChanges.length} unpublished
					<button class="hover:text-primary-500" on:click={onRefresh}
						><Fa icon={faRefresh} /></button
					>
				</p>

				<div class="flex gap-2 items-center py-2">
					<HelpIcon>
						Pipeline {$pipelineState ? 'running' : 'idle'}
						<div
							class="div rounded-full w-3 h-3"
							class:bg-neutral-600={!$pipelineState}
							class:bg-yellow-600={$pipelineState}
						/>
						<p slot="help">
							If the pipline is running, please let it finish. It is updating the database and
							retriggering it will only make it take longer. If it is idle and you changes are not
							integrated yet, you can manually run it again.
						</p>
					</HelpIcon>
				</div>
				{#if $unpublishedChanges.length}
					<div class="flex flex-col gap-2 pb-6 pt-2">
						{#each $unpublishedChanges as change}
							<div class="rounded p-1 text-xs bg-primary-900">
								<p>{change.author}</p>
								<p>{formatDateTime(change.updatedAt)}</p>
							</div>
						{/each}
					</div>
				{/if}
				<p class="opacity-60">Last updated</p>
				<b>
					{formatDateTime($lastUpdated)}
				</b>

				<button class="btn variant-filled-primary mt-4" disabled={loading} on:click={onUpdate}>
					{#if loading}
						<ProgressRadial
							stroke={60}
							meter="stroke-secondary-500"
							track="stroke-secondary-500/30"
							width="w-6"
						/>
					{:else}
						Update DB
					{/if}
				</button>
			</div></svelte:fragment
		>
	</AccordionItem>
</Accordion>
