<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/helper/formatDate';
	import type { FileUpload } from '$lib/types/VPin';
	import UrlChips from '../../URLChips.svelte';

	export let title: string = '';
	export let files: FileUpload[] = [];

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
						<th>Comment</th>
						<th>URLs</th>
						<th>Updated at</th>
					</tr>
				</thead>
				<tbody>
					{#each files as file, i}
						<tr id={file.id} class:glow={fileId === file.id}>
							<td class="w-20">{file.version || ''}</td>
							<td class="w-56">{file.authors?.join(', ') || ''}</td>
							<td>{file.comment || ''}</td>
							<td class="w-40"><UrlChips urls={file.urls} /></td>
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
