<script lang="ts">
	import { DB } from '$lib/stores/DbStore';
	import { EmptyFile } from '$lib/types/VPin';
	import EditButton from '../EditButton.svelte';
	const { getGameImage } = DB;

	export let file = EmptyFile;
	export let href = '';
	export let fileType: string;

	$: bgImg = file.game?.id ? getGameImage(file.game.id) : '';
</script>

<a {href} id={file.id} data-gameid={file.game?.id} data-filetype={fileType} class="aspect">
	<div
		class="card !bg-surface-100 dark:!bg-surface-600 aspect relative overflow-hidden hover:brightness-125 hover:scale-110 transition-all text-xs md:text-base"
	>
		<div class="p-4 flex flex-col justify-between absolute top-0 left-0 right-0 bottom-0 z-10">
			<span class="font-bold">{file.game?.name || '???'} </span>
			<div class="flex justify-between max-w-full">
				<span class="opacity-60 whitespace-nowrap text-ellipsis overflow-hidden"
					>{file.version}</span
				>
				<div class="flex-1" />
				<div class="shrink-0">
					<EditButton {file} />
				</div>
			</div>
		</div>
		<img src={bgImg} class="absolute top-0 left-0 right-0 bottom-0 opacity-10" alt="" />
	</div>
</a>

<style>
	.aspect {
		aspect-ratio: 4/3;
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
</style>
