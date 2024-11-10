<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import { formatDate } from '$lib/helper/formatDate';
	import { Tournaments } from '$lib/stores/tournamentStore';
	import { faAdd, faTrophy } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const { tournamentStore, addNewTournament } = Tournaments;

	const onAdd = () => {
		const { index } = addNewTournament();
		goto(`/tournaments/${index}/edit`);
	};
</script>

<div class="flex flex-col">
	<div class="flex flex-row gap-2 items-center bg-secondary-600/20 p-2">
		<button class="btn btn-icon">
			<Fa icon={faTrophy} />
		</button>
		<div class=" font-bold">Tournaments</div>
	</div>
	<div class="flex gap-4 items-center">
		<div class="flex flex-col">
			{#each $tournamentStore as tournament, i}
				<a
					href={`tournaments/${i}`}
					class="py-4 px-4 hover:bg-primary-400/20 flex gap-4 items-center"
				>
					<div class="flex items-center justify-center variant-ghost-tertiary p-4 rounded shrink-0">
						<Icon name={'tableFiles'} width="24" height="24" />
					</div>
					<div class="flex flex-col">
						<div class="font-semibold">{tournament.title}</div>
						<div class="opacity-60">{formatDate(tournament.createdAt)}</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<button class="btn variant-filled-primary flex gap-4 items-center m-4" on:click={onAdd}>
		<Fa icon={faAdd} />
		Add Tournament
	</button>
</div>
