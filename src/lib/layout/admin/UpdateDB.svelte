<script>
	import HelpIcon from '$lib/components/HelpIcon.svelte';
	import { formatDateTime } from '$lib/helper/formatDate';
	import { DB } from '$lib/stores/DbStore';
	import { User } from '$lib/stores/UserStore';
	import { faRefresh } from '@fortawesome/free-solid-svg-icons';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	const { lastUpdated } = DB;
	const { unpublishedChanges } = User;

	let loading = false;

	const onUpdate = async () => {
		loading = true;
		await User.updateDb();
		loading = false;
	};

	const onRefresh = async () => {
		loading = true;
		await User.getUnpublishedChanges();
		loading = false;
	};
</script>

<div class="flex flex-col">
	<HelpIcon>
		<h4 class="h4">Update DB</h4>
		<p slot="help">Publish the current state of the database.</p>
	</HelpIcon>

	<p class="flex gap-2 my-2 items-center">
		{$unpublishedChanges.length} unpublished
		<button class="hover:text-primary-500" on:click={onRefresh}><Fa icon={faRefresh} /></button>
	</p>
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
</div>
