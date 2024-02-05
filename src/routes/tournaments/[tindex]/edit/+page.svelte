<script lang="ts">
	import { faAdd, faEdit, faRemove, faSave } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { formatDateDashed } from '$lib/helper/formatDate';
	import { Tournaments } from '$lib/stores/tournamentStore';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let { tindex } = data;
	const { tournamentStore } = Tournaments;
	$: tournament = $tournamentStore.length >= tindex ? $tournamentStore[tindex] : undefined;

	const onSave = () => {
		goto('/tournaments/' + tindex);
	};
</script>

{#if tournament}
	<div class="flex flex-col gap-6 p-4 md:p-10 min-h-full">
		<label class="label">
			<span>Title</span>
			<input class="input" type="text" title="Title" bind:value={$tournamentStore[tindex].title} />
		</label>
		<div class="flex flex-col md:flex-row md:items-center gap-6">
			<label class="label">
				<span>Location</span>
				<input
					class="input"
					type="text"
					title="Location"
					bind:value={$tournamentStore[tindex].location}
				/>
			</label>
			<label class="label">
				<span>Date</span>
				<input
					class="input"
					type="date"
					title="Date"
					value={formatDateDashed($tournamentStore[tindex].createdAt || '')}
					on:change={(e) =>
						($tournamentStore[tindex].createdAt = new Date(e.target.value).getTime())}
				/>
			</label>
		</div>
		<div class="flex gap-6 flex-col border border-primary-400 p-2 rounded">
			<div class="flex gap-6 items-center justify-between">
				<div class="font-bold">Players</div>

				<button
					class="btn btn-sm variant-filled-secondary flex gap-4 items-center self-start"
					on:click={() => {
						$tournamentStore[tindex].players.push('');
						$tournamentStore = $tournamentStore;
					}}
				>
					<Fa icon={faAdd} />
					Add new player
				</button>
			</div>
			{#each tournament.players as player, i}
				<div class="flex gap-4">
					<input class="input" type="text" title="Player" bind:value={player} />
					<button
						class="btn btn-icon-sm variant-ghost-error flex gap-4 items-center self-start"
						on:click={() => {
							$tournamentStore[tindex].players.splice(i, 1);
							$tournamentStore = $tournamentStore;
						}}
					>
						<Fa icon={faRemove} />
					</button>
				</div>
			{/each}
		</div>
		<button class="btn variant-filled-primary flex gap-4 items-center mt-auto" on:click={onSave}>
			<Fa icon={faSave} />
			Save
		</button>
	</div>
{/if}
