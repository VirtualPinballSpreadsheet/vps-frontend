<script lang="ts">
	import { page } from '$app/stores';
	import { getUrl } from '$lib/helper/getUrl';
	import { EmptyB2sFile } from '$lib/types/VPin';
	import HeaderInfo from '../../HeaderInfo.svelte';
	import B2sDetailCard from '../../cards/B2sDetailCard.svelte';

	export let b2ss = [EmptyB2sFile];

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
		<div class="grid layout gap-y-10 gap-x-4">
			{#each b2ss as b2s}
				<B2sDetailCard file={b2s} href={getUrl(b2s.urls)} active={fileId === b2s.id} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.layout {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
