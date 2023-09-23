<script lang="ts">
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { EmptyLink } from '$lib/types/Links';

	export let file = EmptyLink;
	export let href = '';
</script>

<a {href} class="flex flex-col" id={file.id}>
	<img
		src={file.imgUrl || Placeholder}
		alt={file.id}
		class="card aspectTable overflow-hidden hover:brightness-125 hover:scale-110 transition-all"
	/>
	<hr />

	<div class="flex flex-col py-4">
		<div class="flex gap-2">
			<p class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{file.title}</p>
			<!-- {#each file.features || [] as feature}
				<div class="badge badge-glass my-auto py-0.5 px-1">
					{feature}
				</div>
			{/each} -->
		</div>
		<h4 class="opacity-60 text-ellipsis whitespace-nowrap overflow-hidden">
			{file.subTitle}
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
