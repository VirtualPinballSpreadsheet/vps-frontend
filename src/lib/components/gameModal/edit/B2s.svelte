<script lang="ts">
	import EditableAutoCompleteChips from '$lib/components/editableInputChip/EditableAutoCompleteChips.svelte';
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

<div
	class="card -mx-2 px-2 py-4 rounded-none md:rounded-md md:mx-0 md:p-4 flex flex-col md:flex-row gap-8"
>
	<div class="w-full md:w-96 flex flex-col gap-4">
		<ImageUpload
			name={file.id}
			imgUrl={file.imgUrl}
			onChange={(url) => {
				file.imgUrl = url;
				file.updatedAt = new Date().getTime();
			}}
			aspect={4 / 3}
		/>
		<div class="hidden md:flex gap-4 mt-auto">
			<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
			<IdTag id={file.id} />
		</div>
	</div>

	<div class="flex flex-col flex-1 gap-4">
		<label class="label">
			<span>Image URL</span>
			<input
				class="input"
				type="text"
				title="Image URL"
				bind:value={file.imgUrl}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>

		<label class="label">
			<span>Comment</span>
			<input
				class="input"
				type="text"
				title="Comment"
				bind:value={file.comment}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>

		<div class="flex gap-4">
			<label class="label w-full">
				<span>Version</span>
				<input
					class="input"
					type="text"
					title="Version"
					bind:value={file.version}
					on:blur={() => (file.updatedAt = new Date().getTime())}
				/>
			</label>

			<label class="label">
				<span>Created at</span>
				<input
					class="input"
					type="date"
					title="Created at"
					value={formatDateDashed(file.createdAt || '')}
					on:blur={() => (file.updatedAt = new Date().getTime())}
					on:change={(e) => (file.createdAt = new Date(e.target.value).getTime())}
				/>
			</label>
		</div>
		<div class="label">
			<span>Features</span>
			<EditableAutoCompleteChips
				options={B2SFeatureOptions}
				bind:value={file.features}
				on:change={() => (file.updatedAt = new Date().getTime())}
			/>
		</div>
		<div class="label">
			<span>Authors</span>
			<EditableAutoCompleteChips
				options={$author.options}
				bind:value={file.authors}
				on:change={() => (file.updatedAt = new Date().getTime())}
			/>
		</div>
		<UrlInputs bind:urls={file.urls} on:blur={() => (file.updatedAt = new Date().getTime())} />
		<div class="md:hidden flex gap-4 mt-8 justify-between">
			<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
			<IdTag id={file.id} />
		</div>
	</div>
</div>
