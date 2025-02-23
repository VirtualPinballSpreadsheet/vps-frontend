<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/helper/formatDate';
	import type { AltColorFile, FileUpload } from '$lib/types/VPin';
	import type { Mode } from 'fs';
	import UrlChips from '../../URLChips.svelte';
	import IdTag from '../../IdTag.svelte';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';

	export let title: string = '';
	export let fileType: Mode;
	export let gameId: string;
	export let files: AltColorFile[] = [];
	$: _files = files?.sort((a, b) => (b.createdAt || b.updatedAt) - (a.createdAt || a.updatedAt));

	$: fileId = $page.url.searchParams.get('fileId');
</script>

{#if files?.length}
	<hr class=" -mx-2 md:-mx-8" />

	<div class="flex flex-col gap-4">
		<slot />
		{#if title}
			<h3 class="h3 flex gap-2">{title}</h3>
		{/if}
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table table-hover table-compact">
				<thead>
					<tr>
						<th>Version</th>
						<th>Authors</th>
						<th>Type</th>
						<th>Filename</th>
						<th>Folder</th>
						<th>Comment</th>
						<th>URLs</th>
						<th>ID</th>
						<th>Updated at</th>
					</tr>
				</thead>
				<tbody>
					{#each _files as file, i}
						<tr
							id={file.id}
							data-gameid={gameId}
							data-filetype={fileType}
							class:glow={fileId === file.id}
						>
							<td class="w-20">{file.version || ''}</td>
							<td class="w-56">{file.authors?.join(', ') || ''}</td>
							<td>{file.type || ''}</td>
							<td
								class="cursor-pointer"
								use:clipboard={file.fileName || ''}
								on:click={() => {
									getToastStore().trigger({ message: `${file.fileName} copied to clipboard.` });
								}}>{file.fileName || ''}</td
							>
							<td
								class="cursor-pointer"
								use:clipboard={file.folder || ''}
								on:click={() => {
									getToastStore().trigger({ message: `${file.folder} copied to clipboard.` });
								}}>{file.folder || ''}</td
							>
							<td>{file.comment || ''}</td>
							<td class="w-40"><UrlChips urls={file.urls} /></td>
							<td class="w-20"><IdTag id={file.id} /></td>
							<td class="w-32">{formatDate(file.updatedAt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

<style>
	.glow {
		box-shadow: 0px 0px 7px 1px rgb(var(--color-primary-500) / 1);
		outline: 1px solid rgb(var(--color-primary-500) / 1);
	}
</style>
