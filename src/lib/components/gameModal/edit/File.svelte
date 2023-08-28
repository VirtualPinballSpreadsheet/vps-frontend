<script lang="ts">
	import AutoCompleteChips from '$lib/components/AutoCompleteChips.svelte';
	import IdTag from '$lib/components/IdTag.svelte';
	import { formatDateDashed } from '$lib/helper/formatDate';
	import { Search } from '$lib/stores/SearchStore';
	import type { FileUpload } from '$lib/types/VPin';
	import UrlInputs from './URLInputs.svelte';

	const { author } = Search;
	export let file: FileUpload;
	export let onDelete = () => {};
</script>

<div class="card -mx-2 px-2 py-4 rounded-none md:rounded-md md:mx-0 md:p-4 flex flex-col gap-8">
	<div class="flex gap-4 flex-col md:flex-row">
		<label class="label flex-1">
			<span>Comment</span>
			<input class="input" type="text" title="Comment" bind:value={file.comment} />
		</label>
		<label class="label">
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

	<div class="label">
		<span>Authors</span>
		<AutoCompleteChips value={file.authors || []} options={$author.options} />
	</div>
	<UrlInputs urls={file.urls || []} />
	<div class="flex gap-4">
		<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
		<IdTag id={file.id} />
	</div>
</div>
