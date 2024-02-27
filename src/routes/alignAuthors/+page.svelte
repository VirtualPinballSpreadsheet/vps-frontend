<script lang="ts">
	import { levenshteinDistance } from '$lib/helper/levenstein';
	import { Edit } from '$lib/stores/EditStore';
	import { Search } from '$lib/stores/SearchStore';
	import { User } from '$lib/stores/UserStore';
	import { ListBox, ListBoxItem, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const { userStore } = User;
	const { author } = Search;

	let search = '';
	let newAuthor = '';
	let valueMultiple: string[] = [];

	$: sortedAuthors = $author.options
		.map((a) => a.label)
		.sort((a, b) => {
			return (
				levenshteinDistance(search, a.toLowerCase()) - levenshteinDistance(search, b.toLowerCase())
			);
		});

	const alignAuthors = () => {
		Edit.alignAuthors(newAuthor, valueMultiple);
		toastStore.trigger({ message: `Aligned authors to ${newAuthor}.` });
		search = '';
		newAuthor = '';
		valueMultiple = [];
	};
</script>

{#if $userStore.admin}
	<div class="p-6 flex flex-col gap-4 w-full">
		<div class="font-bold text-3xl">Align authors</div>

		<div class="flex gap-4 w-full">
			<div class="flex flex-col gap-4 flex-1">
				<label class="label">
					<span>Search authors ({sortedAuthors.length})</span>
					<input bind:value={search} class="input" />
				</label>
				<ListBox
					multiple
					class="flex-1 p-2 border border-primary-400 max-h-[30rem] overflow-y-scroll"
				>
					{#each sortedAuthors as author}
						<ListBoxItem bind:group={valueMultiple} name="medium" value={author}
							>{author}</ListBoxItem
						>
					{/each}
				</ListBox>
			</div>
			<div class="flex flex-col flex-1 gap-4">
				<label class="label">
					<span>Selected authors ({valueMultiple.length})</span>
					<div class="p-2 border border-secondary-400 rounded-md min-h-[2.6rem]">
						{valueMultiple.join(', ')}
					</div>
				</label>
				<label class="label">
					<span>Replace with</span>
					<input bind:value={newAuthor} class="input" />
				</label>

				<button class="btn variant-filled-primary" on:click={alignAuthors}>Replace authors</button>
			</div>
		</div>
	</div>
{/if}
