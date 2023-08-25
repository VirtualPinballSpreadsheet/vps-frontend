<script lang="ts">
	import AutoCompleteChips from '$lib/components/AutoCompleteChips.svelte';
	import IdTag from '$lib/components/IdTag.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import { formatDateDashed } from '$lib/helper/formatDate';
	import { Search } from '$lib/stores/SearchStore';
	import { B2SFeatureOptions, type B2SFile, type TableFile } from '$lib/types/VPin';
	import UrlInputs from './URLInputs.svelte';

	const { features, theme, author } = Search;
	export let file: B2SFile;
	export let onDelete = () => {};
</script>

<div class="card p-4 flex flex-col md:flex-row gap-8">
	<div class="w-full md:w-96 flex flex-col gap-4">
		<ImageUpload
			name={file.id}
			imgUrl={file.imgUrl}
			onChange={(url) => (file.imgUrl = url)}
			aspect={4 / 3}
		/>
		<div class="flex gap-4 mt-auto">
			<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
			<IdTag id={file.id} />
		</div>
	</div>

	<div class="flex flex-col flex-1 gap-4">
		<label class="label">
			<span>Image URL</span>
			<input class="input" type="text" title="Image URL" bind:value={file.imgUrl} />
		</label>

		<label class="label">
			<span>Comment</span>
			<input class="input" type="text" title="Comment" bind:value={file.comment} />
		</label>

		<div class="flex gap-4">
			<label class="label w-full">
				<span>Version</span>
				<input class="input" type="text" title="Version" bind:value={file.version} />
			</label>

			<label class="label">
				<span>Created at</span>
				<input
					class="input"
					type="date"
					title="Created at"
					value={formatDateDashed(file.createdAt || '')}
					on:change={(e) => (file.createdAt = new Date(e.target.value).getTime())}
				/>
			</label>
		</div>
		<UrlInputs urls={file.urls || []} />
		<div class="label">
			<span>Features</span>
			<AutoCompleteChips value={file.features || []} options={B2SFeatureOptions} />
		</div>
		<div class="label">
			<span>Authors</span>
			<AutoCompleteChips value={file.authors || []} options={$author.options} />
		</div>
	</div>
</div>

<style>
	.pinImage {
		aspect-ratio: 4/3;
	}
</style>
