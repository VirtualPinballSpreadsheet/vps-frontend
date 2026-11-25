<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';
	import {
		faArrowRotateRight,
		faCheck,
		faExternalLink,
		faPlus,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { Scraper } from '$lib/stores/ScraperStore';
	import { DB } from '$lib/stores/DbStore';
	import { User } from '$lib/stores/UserStore';
	import type { ReportAction, ScraperKind } from '$lib/types/Scraper';
	import { EmptyGame, type Game } from '$lib/types/VPin';
	import {
		actionDate,
		findUpdateTarget,
		gameLabel,
		sortKinds,
		vkey
	} from '$lib/helper/scraperUtils';
	import { formatDate } from '$lib/helper/formatDate';
	import { getURLIcon } from '$lib/helper/getURLIcon';
	import { modeMapping } from '$lib/helper/modeMapping';
	import GamePicker from '$lib/components/scraper/GamePicker.svelte';

	const { report, loading, loaded, pendingSeed } = Scraper;
	const { dbStore } = DB;
	const { userStore } = User;

	let activeKind: ScraperKind | undefined = undefined;
	let error = '';

	let kinds: ScraperKind[] = [];
	$: {
		kinds = sortKinds(
			(Object.keys($report) as ScraperKind[]).filter((k) => ($report[k]?.length ?? 0) > 0)
		);
		if (!kinds.includes(activeKind ?? ('' as ScraperKind))) activeKind = kinds[0];
	}
	$: list = (activeKind && $report[activeKind]) || [];

	// prefilled draft versions; admins can fix malformed scraper versions inline
	let versions: Record<string, string> = {};
	$: list.forEach((a) => {
		if (versions[vkey(a)] === undefined)
			versions = { ...versions, [vkey(a)]: a.detail.version ?? '' };
	});

	const reload = async () => {
		error = '';
		const fail = await Scraper.load();
		if (fail) error = fail;
	};
	onMount(() => {
		if (!$loaded) reload();
	});

	let pickerFor: ReportAction | null = null;
	let newGameFor: ReportAction | null = null;
	let newName = '';
	let newManufacturer = '';
	let newYear = '';

	const openEdit = (action: ReportAction, game: Game | undefined, mode: 'UPDATE' | 'CREATE') => {
		if (!game) return;
		if (!Scraper.beginSeed(action, game, mode)) {
			getToastStore().trigger({ message: 'No file data for this action.' });
			return;
		}
		pickerFor = null;
		newGameFor = null;
		goto(mode === 'CREATE' ? '?edit=true' : `?game=${game.id}&edit=true`);
	};

	const startNewGame = (action: ReportAction) => {
		newGameFor = action;
		newName = action.detail.name ?? '';
		newManufacturer = '';
		newYear = '';
	};

	const createGame = () => {
		if (!newGameFor) return;
		const id = nanoid(10);
		const game: Game = {
			...structuredClone(EmptyGame),
			id,
			name: newName.trim() || '???',
			manufacturer: newManufacturer.trim(),
			year: Number.parseInt(newYear) || 0,
			updatedAt: new Date().getTime()
		};
		openEdit(newGameFor, game, 'CREATE');
	};

	const applyVersion = (action: ReportAction) => {
		const version = (versions[vkey(action)] ?? '').trim();
		if (!version) {
			getToastStore().trigger({ message: 'Enter a version first.' });
			return;
		}
		if (Scraper.applyVersionUpdate(action, version)) {
			getToastStore().trigger({ message: `Queued version update to ${version}.` });
		} else {
			getToastStore().trigger({ message: 'Matching file no longer in the DB — Remove it?' });
		}
	};

	const gameOf = (action: ReportAction): Game | undefined =>
		action.gameId ? $dbStore[action.gameId] : undefined;

	const currentVersion = (action: ReportAction): string => {
		const game = gameOf(action);
		if (!game) return '?';
		return findUpdateTarget(game, action)?.version || '?';
	};

	const KIND_FT: Partial<Record<ScraperKind, keyof typeof modeMapping>> = {
		table: 'tableFiles',
		b2s: 'b2sFiles',
		tutorial: 'tutorialFiles',
		rom: 'romFiles',
		pupPack: 'pupPackFiles',
		altColor: 'altColorFiles',
		altSound: 'altSoundFiles',
		pov: 'povFiles',
		wheelArt: 'wheelArtFiles',
		topper: 'topperFiles',
		mediaPack: 'mediaPackFiles',
		rule: 'ruleFiles'
	};

	const kindName = (kind: ScraperKind): string => {
		const ft = KIND_FT[kind];
		return ft ? modeMapping[ft].name : kind;
	};
</script>

<svelte:head>
	<title>Missing Resources — VPS</title>
</svelte:head>

{#if $userStore.admin}
	<div class="flex flex-col gap-6 p-4 max-w-full">
		<div class="flex items-center gap-4 flex-wrap">
			<h1 class="h1">Missing Resources</h1>
			<span class="opacity-60">
				from the <a
					class="underline"
					href="https://davidkoski.github.io/vps-db-tool/"
					target="missing">scraper report</a
				>
			</span>
			<button class="btn btn-sm variant-soft-primary" on:click={reload}>
				<Fa icon={faArrowRotateRight} class={$loading ? 'animate-spin' : ''} /> Reload
			</button>
			{#if error}<span class="text-red-500 text-sm">{error}</span>{/if}
		</div>

		{#if $pendingSeed}
			<p class="text-sm opacity-60">
				An edit for “{$pendingSeed.action.detail.name}” is in progress (<button
					class="underline"
					on:click={() => goto('?edit=true')}>resume</button
				>
				·
				<button class="underline" on:click={Scraper.cancelSeed}>cancel</button>)
			</p>
		{/if}

		{#if !$loaded}
			<p class="opacity-60">Loading report…</p>
		{:else if !kinds.length}
			<p>Nothing pending — the report is empty. 🎉</p>
		{:else}
			<div class="flex gap-2 flex-wrap">
				{#each kinds as kind (kind)}
					<button
						class="btn btn-sm"
						class:variant-filled-primary={activeKind === kind}
						class:variant-soft-surface={activeKind !== kind}
						on:click={() => (activeKind = kind)}
					>
						{kindName(kind)}
						<span class="chip btn-sm px-2 py-0 ml-2">{$report[kind]?.length ?? 0}</span>
					</button>
				{/each}
			</div>

			{#if pickerFor}
				<GamePicker
					hint={pickerFor.detail.name + ' — ' + pickerFor.detail.author}
					onSelect={(game) => pickerFor && openEdit(pickerFor, game, 'UPDATE')}
					onClose={() => (pickerFor = null)}
				/>
			{/if}

			{#if newGameFor}
				<div class="card p-4 flex flex-col gap-3 variant-soft-surface max-w-md">
					<div class="flex items-center justify-between">
						<span class="h5">New game</span>
						<button class="btn btn-sm variant-ghost-secondary" on:click={() => (newGameFor = null)}>
							<Fa icon={faXmark} />
						</button>
					</div>
					<label class="label"
						><span>Name</span>
						<input class="input" bind:value={newName} /></label
					>
					<label class="label"
						><span>Manufacturer</span>
						<input class="input" bind:value={newManufacturer} /></label
					>
					<label class="label"
						><span>Year</span>
						<input class="input" bind:value={newYear} /></label
					>
					<p class="text-sm opacity-60">
						The resource will be seeded into the new game; fill in the rest in the editor.
					</p>
					<button class="btn variant-filled-primary self-end" on:click={createGame}>
						<Fa icon={faPlus} /> Create &amp; edit
					</button>
				</div>
			{/if}

			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b-2 border-surface-400/40">
							<th class="text-left py-2 px-2">Name</th>
							<th class="text-left py-2 px-2">Game</th>
							<th class="text-left py-2 px-2">Author</th>
							<th class="text-left py-2 px-2">Message</th>
							<th class="text-left py-2 px-2">Date</th>
							<th class="text-left py-2 px-2">Source</th>
							<th class="text-left py-2 px-2">Action</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each list as action (action.detail.normalizedURL + action.message + (action.id ?? ''))}
							<tr class="border-b border-surface-400/20 align-top">
								<td class="py-1.5 px-2 max-w-xs">{action.detail.name}</td>
								<td class="py-1.5 px-2 max-w-[16rem]">
									{#if gameOf(action)}{gameLabel(gameOf(action))}{:else if action.gameId}
										<span class="opacity-40" title={action.gameId}>(gone game)</span>
									{:else}
										<span class="opacity-40">—</span>
									{/if}
								</td>
								<td class="py-1.5 px-2">{action.detail.author}</td>
								<td class="py-1.5 px-2 max-w-[14rem]">{action.message}</td>
								<td class="py-1.5 px-2 whitespace-nowrap">
									{formatDate(actionDate(action))}
								</td>
								<td class="py-1.5 px-2 whitespace-nowrap">
									<a
										href={action.detail.normalizedURL}
										target="_blank"
										rel="noreferrer"
										class="chip variant-soft-surface gap-2"
										title={action.detail.site}
										>{getURLIcon({ url: action.detail.normalizedURL }).title}<Fa
											icon={faExternalLink}
											size="xs"
										/></a
									>
								</td>
								<td class="py-1.5 px-2">
									{#if action.action === 'update'}
										<div class="flex items-center gap-2 flex-wrap">
											<span class="opacity-60 whitespace-nowrap">{currentVersion(action)} →</span>
											<input class="input input-sm w-24" bind:value={versions[vkey(action)]} />
											<button
												class="btn btn-sm variant-filled-primary"
												on:click={() => applyVersion(action)}
											>
												<Fa icon={faCheck} /> Apply
											</button>
										</div>
									{:else}
										<div class="flex items-center gap-2 flex-wrap">
											{#if gameOf(action)}
												<button
													class="btn btn-sm variant-filled-primary"
													on:click={() => openEdit(action, gameOf(action), 'UPDATE')}
												>
													Edit “{gameOf(action)?.name}”
												</button>
												<button
													class="btn btn-sm variant-soft-surface"
													on:click={() => (pickerFor = action)}
												>
													Wrong game…
												</button>
											{:else}
												<button
													class="btn btn-sm variant-filled-primary"
													on:click={() => (pickerFor = action)}
												>
													Pick game…
												</button>
											{/if}
											<button
												class="btn btn-sm variant-soft-surface"
												on:click={() => startNewGame(action)}
											>
												New game…
											</button>
										</div>
									{/if}
								</td>
								<td class="py-1.5 px-1">
									<button
										class="btn btn-sm variant-ghost-secondary"
										title="Remove from list (until reload)"
										on:click={() => Scraper.removeAction(action.kind, action)}
									>
										<Fa icon={faXmark} />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
{:else}
	<div class="p-8">
		<h1 class="h1">Missing Resources</h1>
		<p class="opacity-60">Admins only — sign in first.</p>
	</div>
{/if}
