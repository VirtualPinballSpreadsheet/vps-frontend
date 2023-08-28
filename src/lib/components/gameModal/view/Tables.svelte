<script lang="ts">
	import { page } from '$app/stores';
	import TableDetailCardMobile from '$lib/components/cards/TableDetailCardMobile.svelte';
	import { getUrl } from '$lib/helper/getUrl';
	import { mobile } from '$lib/helper/mobile';
	import type { TableFile } from '$lib/types/VPin';
	import TableDetailCard from '../../cards/TableDetailCard.svelte';
	import HeaderInfo from './HeaderInfo.svelte';

	export let tables: TableFile[] = [];
	export let gameId: string;

	$: fileId = $page.url.searchParams.get('fileId');
</script>

{#if tables?.length}
	<div class="flex flex-col gap-4">
		<HeaderInfo title="Tables">
			<div class="w-60">
				<p>Add tables to your Tables folder.</p>
				<p class="pre p-2 my-2">C:/PATH_TO_VPX/tables</p>
				<p>
					If you're using Popper, don't forget to add them to you Popper library and possibly a
					playlist!
				</p>
			</div>
		</HeaderInfo>
		{#if $mobile.mobile}
			<div class="flex flex-col gap-6">
				{#each tables as table}
					<TableDetailCardMobile file={table} active={fileId === table.id} />
				{/each}
			</div>
		{:else}
			<div class="grid layout gap-y-10 gap-x-4">
				{#each tables as table}
					<TableDetailCard
						file={table}
						href={getUrl(table.urls)}
						active={fileId === table.id}
						{gameId}
					/>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.layout {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
