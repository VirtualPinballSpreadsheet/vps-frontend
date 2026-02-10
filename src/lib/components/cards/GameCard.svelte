<script lang="ts">
	import { EmptyGame } from '$lib/types/VPin';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';

	export let file = EmptyGame;
	export let href = '';

	$: bgImg = getBackglassUrl(file);

	$: formats = Array.from(
		new Set((file.tableFiles || []).map((t) => t.tableFormat).filter((f) => !!f))
	);
</script>

<a
	class="wrapper relative z-0 inline-block max-w-full min-w-0 w-full flex flex-col"
	{href}
	id={file.id}
>
	<!-- Main Img -->
	<img
		src={bgImg}
		alt={file.name}
		class="card pinImage bg-surface-300-600-token shadow-black hover:brightness-125 hover:scale-110 transition-all"
		loading="lazy"
		decoding="async"
	/>

	<!-- Main Text -->
	<div class="info flex flex-col py-4">
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.name}</p>
			{#each formats as format}
				<div class="badge badge-glass my-auto py-0.5 px-1">
					{format}
				</div>
			{/each}
		</div>
		<p>{file.manufacturer} ({file.year})</p>
		<p class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
			{file.designers?.join(', ') || ''}
		</p>
	</div>
</a>

<style lang="scss">
	.pinImage {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
	}
</style>
