<script lang="ts">
	import { formatDate } from '$lib/helper/formatDate';
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import { EmptyGame } from '$lib/types/VPin';
	import { faArrowLeft, faEdit, faExternalLink } from '@fortawesome/free-solid-svg-icons';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import IdTag from '../../IdTag.svelte';
	import { User } from '$lib/stores/UserStore';
	import { Edit } from '$lib/stores/EditStore';
	import { page } from '$app/stores';

	const { userStore } = User;
	const { editStore } = Edit;

	export let game = EmptyGame;
</script>

<div class="flex gap-4 md:gap-8 flex-col md:flex-row">
	<a
		class="flex md:hidden chip variant-soft-secondary hover:variant-filled-secondary gap-2 flex-1"
		href={$page.url.pathname}><Fa icon={faArrowLeft} />Back</a
	>
	<img
		class="rounded-md aspectBG w-96"
		src={game.imgUrl || getBackglassUrl(game)}
		alt={game.name}
	/>
	<div class="flex flex-col flex-1 gap-2">
		<div class="flex flex-col-reverse md:flex-row gap-4 md:gap-2">
			<p class="flex-1 uppercase font-bold text-sm opacity-40">
				{game.theme?.join(' • ') || ''}
			</p>
			<div class="flex flex-1 md:flex-initial gap-2">
				{#if game.ipdbUrl}
					<a
						class="chip variant-soft-tertiary hover:variant-filled-tertiary gap-2 flex-1"
						target="_blank"
						href={game.ipdbUrl}><Fa icon={faExternalLink} />IPDB</a
					>
				{/if}
				{#if $userStore.admin}
					<a
						href="?edit=true"
						class="chip variant-soft-primary hover:variant-filled-primary gap-2 flex-1"
						on:click={() => {
							$editStore.cache = {
								id: game?.id,
								action: 'UPDATE',
								data: JSON.parse(JSON.stringify(game))
							};
						}}><Fa icon={faEdit} />Edit</a
					>
				{/if}
			</div>
		</div>
		<h1 class="h1">{game.name}</h1>
		<h4 class="h4">{game.manufacturer} ({game.year})</h4>
		<p class="opacity-60">{game.designers?.join(', ') || ''}</p>
		<div
			class="flex w-full mt-4 md:mt-auto card items-center"
			style="background:{$modeCurrent ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'}!important;"
		>
			<div class="flex flex-col items-center justify-center flex-1 gap-1 my-3">
				<p class="text-xs font-bold uppercase opacity-40">Players</p>
				<p class="">{game.players || '-'}</p>
			</div>
			<div class="bg-surface-900-50-token h-full w-px opacity-10" />
			<div class="flex flex-col items-center justify-center flex-1 gap-1">
				<p class="text-xs font-bold uppercase opacity-40">Type</p>
				<p class="">{game.type || '-'}</p>
			</div>
			<div class="bg-surface-900-50-token h-full w-px opacity-10" />
			<div class="flex flex-col items-center justify-center flex-1 gap-1">
				<p class="text-xs font-bold uppercase opacity-40">Updated at</p>
				<p class="">{formatDate(game.lastCreatedAt ?? game.updatedAt)}</p>
			</div>
			<div class="bg-surface-900-50-token h-full w-px opacity-10" />
			<div class="flex flex-col items-center justify-center flex-1 gap-1">
				<p class="text-xs font-bold uppercase opacity-40">ID</p>
				<IdTag id={game.id} />
			</div>
		</div>
	</div>
</div>

<style>
	.aspectBG {
		aspect-ratio: 4/3;
		object-fit: cover;
	}
</style>
