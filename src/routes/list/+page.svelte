<script lang="ts">
	import FileIcons from '$lib/components/FileIcons.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import UrlChips from '$lib/components/URLChips.svelte';
	import { modeMapping } from '$lib/helper/modeMapping';
	import { List } from '$lib/stores/listStore';
	import { faRemove } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const { bookmarks, checkedBookmarks, deleteFromList } = List;

	const checkItem = (id: string) => {
		const i = $checkedBookmarks.indexOf(id);
		if (i <= -1) {
			$checkedBookmarks.push(id);
			$checkedBookmarks = $checkedBookmarks;
		} else {
			$checkedBookmarks.splice(i, 1);
			$checkedBookmarks = $checkedBookmarks;
		}
	};
	$: console.log($bookmarks);
</script>

<div class="p-4 md:p-10">
	<h2 class="h2 mb-10">Bookmarks</h2>
	<div class="pb-8">
		<p>
			You can right click files across the App and bookmark them for future reference and check them
			off once you downloaded them. Like a shopping list :)
		</p>
		<p>Your bookmarks are stored locally and persistant.</p>
	</div>
	<div>
		{#each $bookmarks as b}
			<div class="card p-4 gap-8 flex flex-col mb-4">
				<div class="flex gap-2 items-center">
					<Icon name="game" />
					<h4 class="h4">{b.name}</h4>
					<button
						class="btn btn-icon ml-auto text-primary-500 hover:text-primary-600-300-token"
						on:click={() => deleteFromList('bookmarks', b.id)}><Fa icon={faRemove} /></button
					>
				</div>
				<div class="flex flex-wrap">
					{#each Object.entries(b.files).sort((i1, i2) => (i1[0] < i2[0] ? -1 : 1)) as [ft, _files]}
						<div class="flex-1 flex-shrink-0">
							<div class="flex gap-2 items-center mb-4 -mx-4 px-4 py-1 bg-surface-200-700-token">
								<FileIcons fileType={ft} />
								<p>{modeMapping[ft]?.name || '???'}</p>
							</div>

							{#each _files as file}
								{@const checked = $checkedBookmarks.includes(file.id)}
								<div class="flex items-center gap-4 mb-2 mr-20">
									<input
										type="checkbox"
										class="checkbox"
										{checked}
										on:click={() => checkItem(file.id)}
									/>
									<div class="flex items-center gap-4 mb-2" class:opacity-20={checked}>
										{#if file.imgUrl}
											<img src={file.imgUrl} class="w-10 h-10 object-cover" />
										{:else}
											<div>{file.version}</div>
										{/if}
										<UrlChips urls={file.urls} />
									</div>
								</div>
							{/each}
						</div>
					{/each}
					<div class="flex items-center py-1 bg-surface-200-700-token flex-1 h-8 -mr-4" />
				</div>
			</div>
		{/each}
	</div>
</div>
