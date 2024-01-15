<script lang="ts">
	import AutoCompleteChips from '$lib/components/AutoCompleteChips.svelte';
	import IdTag from '$lib/components/IdTag.svelte';
	import { formatDate, formatDateDashed } from '$lib/helper/formatDate';
	import { Search } from '$lib/stores/SearchStore';
	import type { TutorialFile } from '$lib/types/VPin';
	import UrlInputs from './URLInputs.svelte';

	const { author } = Search;
	export let file: TutorialFile;
	export let onDelete = () => {};
</script>

<div class="card -mx-2 px-2 py-4 rounded-none md:rounded-md md:mx-0 md:p-4 flex flex-col gap-8">
	<div class="flex gap-4 flex-col md:flex-row">
		<label class="label flex-1">
			<span>Title</span>
			<input
				class="input"
				type="text"
				title="Title"
				bind:value={file.title}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
		<label class="label">
			<span>Youtube Id</span>
			<input
				class="input"
				type="text"
				title="Youtube Id"
				bind:value={file.youtubeId}
				on:blur={() => (file.updatedAt = new Date().getTime())}
			/>
		</label>
	</div>

	<div class="label">
		<span>Authors</span>
		<AutoCompleteChips
			value={file.authors}
			options={$author.options}
			on:change={(v) => {
				file.updatedAt = new Date().getTime();
				file.authors = v.detail;
			}}
		/>
	</div>

	<div class="flex gap-4">
		<button class="btn btn-sm variant-filled-error" on:click={onDelete}>Delete</button>
		<IdTag id={file.id} />
	</div>
</div>
