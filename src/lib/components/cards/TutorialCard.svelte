<script lang="ts">
	import { EmptyTutorialFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { formatDate } from '$lib/helper/formatDate';
	import IdTag from '../IdTag.svelte';

	export let file = EmptyTutorialFile;
	export let href = '';
	export let active = false;
	export let gameId: string;
</script>

<div class="flex flex-col" id={file.id} data-gameid={gameId} data-filetype="b2sFiles">
	<a {href} target="_blank" class="relative group">
		<iframe
			title={file.title}
			class:glow={active}
			class="card aspectTable"
			width="352"
			height="264"
			src={`https://www.youtube.com/embed/${file.youtubeId}`}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowFullScreen
		/>
	</a>

	<div class="flex flex-col py-4">
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
				{file.title}
			</p>
		</div>
		<p class="text-ellipsis whitespace-nowrap overflow-hidden opacity-60">
			{file.authors?.join(', ')}
		</p>
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
