<script lang="ts">
	import { EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import { formatDate } from '$lib/helper/formatDate';
	import FeatureBlock from '../FeatureBlock.svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import UrlChips from '../URLChips.svelte';
	import IdTag from '../IdTag.svelte';

	export let file = EmptyTableFile;
	export let active = false;
	export let href = '';
	export let gameId: string;
</script>

<div class="flex flex-col" id={file.id} data-gameid={gameId} data-filetype="tableFiles">
	<a {href} target={href ? '_blank' : ''} class="relative group">
		<div
			style="background:{$modeCurrent ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.4)'}!important;"
			class="card absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md p-4 gap-4 flex flex-col items-start"
		>
			<p class="font-bold max-h-48 overflow-hidden max-w-full">
				{file.authors?.join(', ')}
			</p>
			<p>{file.version}</p>
			{#if file.comment}
				<p>{file.comment}</p>
			{/if}
			<UrlChips urls={file.urls} />
			<div class="flex mt-auto w-full">
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Updated at</p>
					<p class="">{formatDate(file.updatedAt)}</p>
				</div>
				<div class="bg-surface-900-50-token h-full w-px opacity-20" />
				<div class="flex flex-col items-center justify-center flex-1 gap-1">
					<p class="text-xs font-bold uppercase opacity-40">Added at</p>
					<p class="">{formatDate(file.createdAt || file.updatedAt)}</p>
				</div>
			</div>
		</div>
		<img
			class:glow={active}
			src={file.imgUrl || Placeholder}
			alt={file.id}
			class="card pinImage bg-surface-300-600-token"
		/>
	</a>
	<div class="flex flex-col py-4">
		{#if file.edition}
		<div class="flex gap-2">
			<p class="text-ellipsis whitespace-nowrap overflow-hidden">{file.edition}</p>
		</div>
		{/if}
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
				{file.authors?.join(', ')}
			</p>
			<div class="badge badge-glass my-auto py-0.5 px-1">
				{file.tableFormat}
			</div>
		</div>
		<div class="my-2"><FeatureBlock data={file.features} /></div>
		<div class="flex justify-between">
			<IdTag id={file.id} />
			<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
				{formatDate(file.createdAt || file.updatedAt)}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.pinImage {
		aspect-ratio: 9/16;
		object-fit: cover;
		width: 100%;
		z-index: 100;
	}
	.glow {
		box-shadow: 0px 0px 7px 1px rgb(var(--color-primary-500) / 1);
		outline: 1px solid rgb(var(--color-primary-500) / 1);
	}
</style>
