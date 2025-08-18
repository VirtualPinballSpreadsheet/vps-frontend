<script lang="ts">
	import EditableAutoCompleteChips from '$lib/components/editableInputChip/EditableAutoCompleteChips.svelte';
	import IdTag from '$lib/components/IdTag.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import { formatDateDashed } from '$lib/helper/formatDate';
	import { Search } from '$lib/stores/SearchStore';
	import { B2SFeatureOptions, type B2SFile, type TableFile } from '$lib/types/VPin';
	import UrlInputs from './URLInputs.svelte';
    import { Paste, getClipboardText } from '$lib/helper/paste';

	const { features, theme, author } = Search;
	export let file: B2SFile;
	export let onDelete = () => {};
    export let paste: Paste;

	function pasteVersion(event: ClipboardEvent): void {
		const clipboardText = getClipboardText(event);
		const [newFile, applied] = paste.pasteVersion(file, clipboardText);
		if (applied) {
			file = newFile;
			event.preventDefault();
		}
	}
	function pasteAuthors(event: ClipboardEvent) {
		const clipboardText = getClipboardText(event);
		const [newFile, applied] = paste.pasteAuthors(file, clipboardText);
		if (applied) {
			file = newFile;
			event.preventDefault();
		}
	}
	function pasteFeatures(event: ClipboardEvent) {
		const clipboardText = getClipboardText(event);
		const [newFile, applied] = paste.pasteFeatures(file, clipboardText);
		if (applied) {
			file = newFile;
			event.preventDefault();
		}
	}
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
					on:paste={pasteVersion}
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
					on:paste={pasteVersion}
					on:change={(e) => (file.createdAt = new Date(e.target.value).getTime())}
				/>
			</label>
		</div>
		<div class="label">
			<span>Features</span>
			<EditableAutoCompleteChips
				options={B2SFeatureOptions}
				bind:value={file.features}
				onPaste={pasteFeatures}
				on:change={() => (file.updatedAt = new Date().getTime())}
			/>
		</div>
		<div class="label">
			<span>Authors</span>
			<EditableAutoCompleteChips
				options={$author.options}
				bind:value={file.authors}
				onPaste={pasteAuthors}
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
