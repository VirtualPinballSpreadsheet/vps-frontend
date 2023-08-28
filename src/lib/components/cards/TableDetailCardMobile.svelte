<script lang="ts">
	import { EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';
	import { DB } from '$lib/stores/DbStore';
	import { formatDate } from '$lib/helper/formatDate';
	import FeatureBlock from '../FeatureBlock.svelte';
	import UrlChips from '../URLChips.svelte';
	import IdTag from '../IdTag.svelte';
	import Tooltip from '../Tooltip.svelte';

	export let file = EmptyTableFile;
	export let active = false;
	export let href = '';

	let open = false;
</script>

<hr class="hr -mx-2" />
<div class="flex flex-col gap-2">
	<Tooltip content={file.authors.join(', ')}>
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
				{file.authors?.join(', ')}
			</p>
			<div class="badge badge-glass my-auto py-0.5 px-1">
				{file.tableFormat}
			</div>
		</div>
	</Tooltip>
	<div class="flex gap-4" id={file.id}>
		<a {href} target="_blank" class="flex-1">
			<img
				class:glow={active}
				src={file.imgUrl || Placeholder}
				alt={file.id}
				class="card pinImage bg-surface-300-600-token"
			/>
		</a>
		<div class="flex flex-col flex-1 overflow-hidden">
			<div class="my-2 mb-4"><FeatureBlock data={file.features} /></div>
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
