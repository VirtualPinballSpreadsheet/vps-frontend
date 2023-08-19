<script lang="ts">
	import { DB } from '$lib/stores/DbStore';
	import { EmptyFile } from '$lib/types/VPin';
	const { getGameImage } = DB;

	export let file = EmptyFile;
	export let href = '';

	$: bgImg = file.game?.id ? getGameImage(file.game.id) : '';
</script>

<a {href} id={file.id} class="aspect">
	<div
		class="card !bg-surface-100 dark:!bg-surface-600 aspect relative overflow-hidden hover:brightness-125 transition-all"
	>
		<div class="p-4 flex flex-col justify-between absolute top-0 left-0 right-0 bottom-0 z-10">
			<span class="font-bold">{file.game?.name || '???'}</span>
			{#if file.version}
				<span class="opacity-60">{file.version}</span>
			{/if}
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
