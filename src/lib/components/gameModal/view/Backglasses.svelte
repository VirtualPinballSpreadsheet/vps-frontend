<script lang="ts">
	import { page } from '$app/stores';
	import { getUrl } from '$lib/helper/getUrl';
	import type { B2SFile } from '$lib/types/VPin';
	import HeaderInfo from './HeaderInfo.svelte';
	import B2sDetailCard from '../../cards/B2sDetailCard.svelte';
	import { mobile } from '$lib/helper/mobile';
	import B2sDetailCardMobile from '$lib/components/cards/B2sDetailCardMobile.svelte';

	export let b2ss: B2SFile[] = [];
	export let gameId: string;
	$: _b2ss = b2ss?.sort((a, b) => (b.createdAt || b.updatedAt) - (a.createdAt || a.updatedAt));

	$: fileId = $page.url.searchParams.get('fileId');
</script>

{#if b2ss?.length}
	<div class="flex flex-col gap-4">
		<HeaderInfo title="Backglasses">
			<div class="w-60">
				<p>Add backglasses the same folder as your table.</p>
				<p class="pre p-2 my-2">C:/PATH_TO_VPX/tables</p>
				<p>
					Name the file exactly the same as your table to be safe. B2S will find similar files to
					the table, this can lead to conflicts though.
				</p>
			</div>
		</HeaderInfo>

		{#if $mobile.mobile}
			<div class="flex flex-col gap-6">
				{#each _b2ss as b2s}
					<B2sDetailCardMobile file={b2s} href={getUrl(b2s.urls)} active={fileId === b2s.id} />
				{/each}
			</div>
		{:else}
			<div class="grid layout gap-y-10 gap-x-4">
				{#each _b2ss as b2s}
					<B2sDetailCard file={b2s} href={getUrl(b2s.urls)} active={fileId === b2s.id} {gameId} />
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
