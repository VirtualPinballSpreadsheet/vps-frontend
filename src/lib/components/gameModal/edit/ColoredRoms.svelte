<script lang="ts">
	import IdTag from '$lib/components/IdTag.svelte';
	import EditableAutoCompleteChips from '$lib/components/editableInputChip/EditableAutoCompleteChips.svelte';
	import { formatDate, formatDateDashed } from '$lib/helper/formatDate';
	import { Search } from '$lib/stores/SearchStore';
	import type { AltColorFile } from '$lib/types/VPin';
	import UrlInputs from './URLInputs.svelte';

	const { author } = Search;
	export let file: AltColorFile;
	export let onDelete = () => {};
</script>

<div class="card -mx-2 px-2 py-4 rounded-none md:rounded-md md:mx-0 md:p-4 flex flex-col gap-8">
	<div class="flex gap-4 flex-col md:flex-row">
		<label class="label flex-1">
			<span>Comment</span>
			<input
				class="input"
				type="text"
				title="Comment"
				bind:value={file.comment}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
		<label class="label">
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
				on:change={(e) => (file.createdAt = new Date(e.target.value).getTime())}
			/>
		</label>
	</div>
	<div class="flex gap-4 flex-col md:flex-row">
		<label class="label flex-1">
			<span>Type</span>
			<input
				class="input"
				type="text"
				title="Type"
				bind:value={file.type}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
		<label class="label flex-1">
			<span>Filename</span>
			<input
				class="input"
				type="text"
				title="Filename"
				bind:value={file.fileName}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
		<label class="label">
			<span>Folder name</span>
			<input
				class="input"
				type="text"
				title="Version"
				bind:value={file.folder}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
	</div>

	<div class="label">
		<span>Authors</span>
		<EditableAutoCompleteChips
			bind:value={file.authors}
			options={$author.options}
			on:change={(v) => {
				file.updatedAt = new Date().getTime();
				file.authors = v.detail;
			}}
		/>
	</div>
	<UrlInputs
		bind:urls={file.urls}
		on:blur={(v) => {
			file.updatedAt = new Date().getTime();
			file.urls = v.detail;
		}}
	/>
	<div class="flex gap-4">
		<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
		<IdTag id={file.id} />
	</div>
</div>
