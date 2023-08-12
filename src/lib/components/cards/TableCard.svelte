<script lang="ts">
	import { EmptyTableFile } from '$lib/types/VPin';
	import Placeholder from '$lib/assets/img/tablePlaceholder.jpg';

	export let table = EmptyTableFile;
	export let href = '';
</script>

<a class="card overflow-hidden" {href}>
	<img
		src={table.imgUrl || Placeholder}
		alt={table.id}
		class="aspectTable border-bottom bg-surface-600"
	/>
	<hr />
	<div class="flex flex-col p-4">
		<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{table.game?.name}</p>
		<p class="opacity-40 text-ellipsis whitespace-nowrap overflow-hidden">
			{table.authors.join(', ')}
		</p>
	</div>
</a>

<style>
	.aspectTable {
		aspect-ratio: 9/16;
		object-fit: cover;
		width: 100%;
	}
</style>
