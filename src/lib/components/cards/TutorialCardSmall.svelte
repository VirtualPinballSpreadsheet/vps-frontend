<script lang="ts">
	import { EmptyTutorialFile } from '$lib/types/VPin';
	import { formatDate } from '$lib/helper/formatDate';
	import IdTag from '../IdTag.svelte';

	export let file = EmptyTutorialFile;
	export let href = '';
	export let active = false;
	export let gameId: string;
</script>

<a {href} class="flex flex-col" id={file.id} data-gameid={gameId} data-filetype="b2sFiles">
	<img
		alt={file.youtubeId}
		title={file.title}
		class:glow={active}
		class="card aspectTable hover:brightness-125 hover:scale-110 transition-all"
		width="352"
		src={`https://img.youtube.com/vi/${file.youtubeId}/0.jpg`}
	/>

	<div class="flex flex-col py-4">
		<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden leading-4">
			{file.title}
		</p>

		<p class="text-ellipsis whitespace-nowrap overflow-hidden opacity-60 pb-1">
			{file.authors?.join(', ')}
		</p>
	</div>
</a>

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
