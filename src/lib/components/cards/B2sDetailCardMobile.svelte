<script lang="ts">
	import { EmptyB2sFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { formatDate } from '$lib/helper/formatDate';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import UrlChips from '../URLChips.svelte';
	import IdTag from '../IdTag.svelte';
	import Tooltip from '../Tooltip.svelte';

	export let file = EmptyB2sFile;
	export let href = '';
	export let active = false;
</script>

<hr class="hr -mx-2" />
<div class="flex flex-col gap-2">
	<Tooltip content={file.authors.join(', ')}>
		<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
			{file.authors?.join(', ')}
		</p>
	</Tooltip>
	<div class="flex gap-4" id={file.id}>
		<a {href} target={href ? '_blank' : ''} class="flex-1">
			<img
				src={file.imgUrl || Placeholder}
				alt={file.id}
				class:glow={active}
				class="card aspectTable"
			/>
		</a>

		<div class="flex flex-col flex-1 gap-2 overflow-hidden">
			{#if file.features?.length}
				<div class="flex gap-2 my-2 mb-1 mt-0">
					{#each file.features || [] as feature}
						<div class="badge badge-glass my-auto py-0.5 px-1">
							{feature}
						</div>
					{/each}
				</div>
			{/if}
			<div class="[&>*]:flex-col [&>*>*]:flex-1 [&>*]:gap-4 [&>*>*>a]:w-full">
				<UrlChips urls={file.urls} />
			</div>
		</div>
	</div>
	<div class="flex justify-between mt-4">
		<IdTag id={file.id} />
		<h4 class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden">
			{formatDate(file.updatedAt) || '???'}
		</h4>
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
