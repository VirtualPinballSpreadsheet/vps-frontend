<script lang="ts">
	import { EmptyB2sFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';

	export let file = EmptyB2sFile;
	export let href = '';
</script>

<a {href} class="overflow-hidden flex flex-col">
	<img src={file.imgUrl || Placeholder} alt={file.id} class="card aspectTable" />
	<hr />

	<div class="flex flex-col py-4">
		<h4 class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.game?.name}</h4>
		<h4 class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden">
			{file.authors?.join(', ')}
		</h4>
	</div>
</a>

<style>
	.aspectTable {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
	}
</style>
