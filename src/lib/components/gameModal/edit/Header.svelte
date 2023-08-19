<script lang="ts">
	import { getBackglassUrl } from '$lib/helper/getBackglassUrl';
	import { EmptyGame } from '$lib/types/VPin';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import AutoCompleteChips from '$lib/components/AutoCompleteChips.svelte';
	import { Search } from '$lib/stores/SearchStore';

	const { designers, theme } = Search;
	export let game = EmptyGame;
	export let onEdit = () => {};

	let ipdbId = '';
	const ipdbUrl = 'https://www.ipdb.org/machine.cgi?id=';
	$: {
		const tokens = game.ipdbUrl?.split('cgi?id=');
		if (tokens?.length == 2) ipdbId = tokens[1];
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-8 flex-col md:flex-row">
		<img
			class="rounded-md aspectBG md:w-96"
			src={game.imgUrl || getBackglassUrl(game)}
			alt={game.name}
		/>
		<div class="flex flex-col flex-1 gap-4">
			<div class="flex gap-4 flex-col md:flex-row">
				<label class="label flex-1">
					<span>Name</span>
					<input class="input" type="text" title="Name" bind:value={game.name} />
				</label>
				<div class="label flex flex-col">
					<span>Type</span>
					<RadioGroup>
						<RadioItem bind:group={game.type} name="justify" value="EM">EM</RadioItem>
						<RadioItem bind:group={game.type} name="justify" value="SS">SS</RadioItem>
						<RadioItem bind:group={game.type} name="justify" value="PM">PM</RadioItem>
					</RadioGroup>
				</div>
			</div>
			<div class="flex flex-col md:flex-row gap-4">
				<label class="label flex-1">
					<span>Manufacturer</span>
					<input class="input" type="text" title="Manufacturer" bind:value={game.manufacturer} />
				</label>

				<label class="label flex-1">
					<span>Year</span>
					<input class="input" type="number" title="Year" bind:value={game.year} />
				</label>

				<label class="label flex-1">
					<span>Players</span>
					<input class="input" type="number" title="Players" bind:value={game.year} />
				</label>
			</div>
			<div class="flex flex-col md:flex-row gap-4">
				<label class="label flex-1">
					<span>Image URL</span>
					<input class="input" type="text" title="Image URL" bind:value={game.imgUrl} />
					<span class="opacity-60">If none exists, takes first b2s image.</span>
				</label>

				<label class="label flex-1">
					<span>ipdb ID</span>
					<input
						class="input"
						type="text"
						title="ipdb Url"
						value={ipdbId}
						on:change={(e) => {
							game.ipdbUrl = e.target.value ? ipdbUrl + e.target.value : undefined;
						}}
					/>
					<span class="opacity-60 text-xs">{game.ipdbUrl || ''}</span>
				</label>
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col md:flex-row gap-4">
		<div class="label flex flex-col flex-1">
			<span>Designers</span>
			<AutoCompleteChips options={$designers.options} value={game.designers || []} />
		</div>
		<div class="label flex flex-col flex-1">
			<span>Theme</span>
			<AutoCompleteChips options={$theme.options} value={game.theme || []} />
		</div>
	</div>
</div>

<style>
	.aspectBG {
		aspect-ratio: 4/3;
		object-fit: cover;
	}
</style>
