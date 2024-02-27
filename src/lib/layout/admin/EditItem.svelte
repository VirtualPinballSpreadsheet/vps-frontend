<script lang="ts">
	import { formatDate } from '$lib/helper/formatDate';
	import { DB } from '$lib/stores/DbStore';
	import { Edit } from '$lib/stores/EditStore';
	import type { GameEdit } from '$lib/types/EditVPin';
	import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { nanoid } from 'nanoid';
	import Fa from 'svelte-fa';
	import { diff, flattenChangeset } from 'json-diff-ts';
	import Tooltip from '$lib/components/Tooltip.svelte';
	const { editStore, deleteEdit } = Edit;
	const { dbStoreOriginal } = DB;

	export let edit: GameEdit;

	$: game = edit.action === 'UPDATE' ? $dbStoreOriginal[edit.id] : undefined;

	$: changes = game ? flattenChangeset(diff(game, edit.data)) : undefined;

	const id = nanoid(10);
	const popupHover: PopupSettings = {
		event: 'click',
		target: id,
		placement: 'bottom'
	};
</script>

{#if edit}
	<div use:popup={popupHover}>
		<button class="flex flex-col hover:text-primary-600-300-token">
			<p>{edit.data.name}</p>
			<p class="opacity-60">{formatDate(edit.data.updatedAt)}</p>
		</button>
	</div>
	<div
		class="card p-4 variant-filled-surface z-50 border-primary-500 border shadow-md"
		data-popup={id}
	>
		<div class="flex flex-col gap-4 w-full max-w-md">
			<div class="flex w-full gap-2 items-center">
				<b class="mr-auto">{edit.action}</b>
				<Tooltip content="Revise edit">
					<a
						class=" btn-icon btn-icon-sm variant-filled-surface"
						href="?edit=true"
						on:click={() => {
							$editStore.cache = edit;
						}}><Fa icon={faEdit} /></a
					>
				</Tooltip>
				<Tooltip content="Delete edit">
					<button
						class=" btn-icon btn-icon-sm variant-filled-error"
						on:click={() => deleteEdit([edit])}><Fa icon={faRemove} /></button
					>
				</Tooltip>
			</div>

			{#if changes}
				<div class="overflow-x-auto flex flex-col gap-2 max-h-80 bg-surface-300-600-token p-2">
					{#each changes as change}
						<div class="grid grid-cols-[1fr_2fr] gap-x-4">
							<div class="overflow-hidden text-ellipsis">
								{change.key}
							</div>
							<b class="overflow-hidden text-ellipsis">{change.value}</b>
							<div class="opacity-60 text-xs overflow-hidden text-ellipsis">
								{change.path}
							</div>

							<s class="opacity-60 text-xs overflow-hidden text-ellipsis">{change.oldValue}</s>
						</div>
						<hr />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
