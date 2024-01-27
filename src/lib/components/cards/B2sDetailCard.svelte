<script lang="ts">
	import { EmptyB2sFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { formatDate } from '$lib/helper/formatDate';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import UrlChips from '../URLChips.svelte';
	import IdTag from '../IdTag.svelte';

	export let file = EmptyB2sFile;
	export let href = '';
	export let active = false;
	export let gameId: string;
</script>

<div class="flex flex-col" id={file.id} data-gameid={gameId} data-filetype="b2sFiles">
	<a {href} target="_blank" class="relative group">
		<div
			style="background:{$modeCurrent ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.4)'}!important;"
			class="card absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md p-4 gap-4 flex flex-col"
		>
			<div class="flex flex-col">
				<p class="font-bold">
					{file.authors?.join(', ')}
				</p>
				<p>{file.version}</p>
			</div>
			{#if file.comment}
				<p>{file.comment}</p>
			{/if}
			<UrlChips urls={file.urls} />
		</div>
		<img
			src={file.imgUrl || Placeholder}
			alt={file.id}
			class:glow={active}
			class="card aspectTable"
		/>
	</a>

	<div class="flex flex-col py-4">
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
				{file.authors?.join(', ') || 'Unknown author'}
			</p>
			{#each file.features || [] as feature}
				<div class="badge badge-glass my-auto py-0.5 px-1">
					{feature}
				</div>
			{/each}
		</div>
		<div class="flex justify-between">
			<IdTag id={file.id} />
			<h4 class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden">
				{formatDate(file.updatedAt) || '???'}
			</h4>
		</div>
	</div>
</div>

<style>
	.aspectTable {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
	}
	.glow {
		outline: 1px solid rgb(var(--color-primary-500) / 1);
		box-shadow: 0px 0px 7px 1px rgb(var(--color-primary-500) / 1);
	}
</style>
