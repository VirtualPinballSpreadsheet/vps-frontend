<script lang="ts">
	import { EmptyB2sFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';

	export let b2s = EmptyB2sFile;
</script>

<div class="card overflow-hidden flex flex-col">
	<img src={b2s.imgUrl || Placeholder} alt={b2s.id} class="aspectTable" />
	<hr />

	<div class="flex flex-col p-4">
		<h4 class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{b2s.game?.name}</h4>
		<h4 class="opacity-40 text-ellipsis whitespace-nowrap overflow-hidden">
			{b2s.authors?.join(', ')}
		</h4>
	</div>
</div>

<style>
	.aspectTable {
		aspect-ratio: 4/3;
		object-fit: cover;
		width: 100%;
	}
</style>
