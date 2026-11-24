<script lang="ts">
	import {
		AppBar,
		clipboard,
		getDrawerStore,
		getToastStore,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import Logo from '$lib/assets/img/vpsLogo.png';
	import { User } from '$lib/stores/UserStore';
	import Fa from 'svelte-fa';
	import {
		faArrowUpFromBracket,
		faFilter,
		faSearch,
		faSort
	} from '@fortawesome/free-solid-svg-icons';
	import { Search } from '$lib/stores/SearchStore';
	import { modeMapping } from '$lib/helper/modeMapping';
	import { buildShareUrl } from '$lib/helper/shareSearch';
	import Navigation from './Navigation.svelte';

	const {
		query,
		mode,
		sortBy,
		filterActive,
		isSearchActive,
		year,
		players,
		manufacturer,
		features,
		theme,
		author,
		designers,
		resetFilters
	} = Search;

	const modes = Object.entries(modeMapping);
	const drawerStore = getDrawerStore();
	const onOpenDrawer = () => {
		drawerStore?.open();
	};

	const popupSort: PopupSettings = {
		event: 'click',
		target: 'popupSort',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	// An active filter with no selected values is treated as inactive (null).
	const listFilter = (f: { active: boolean; value: string[]; negate: boolean }) =>
		f.active && f.value.length ? { values: f.value, negate: f.negate } : null;
	// The share URL is a function of the whole search state. Referencing each
	// reactive value here makes Svelte recompute it when any of them change.
	$: shareState = {
		query: $query,
		mode: $mode,
		sortBy: $sortBy,
		year: $year.active ? $year.value : null,
		players: $players.active ? $players.value : null,
		manufacturer: listFilter($manufacturer),
		features: listFilter($features),
		theme: listFilter($theme),
		author:
			$author.active && $author.value.length
				? { values: $author.value, negate: $author.negate, firstOnly: $author.firstOnly }
				: null,
		designers: $designers.active ? $designers.value : null
	};
	$: shareUrl = $isSearchActive ? buildShareUrl(shareState) : '';
</script>

<AppBar padding="py-2 md:py-4 px-0 pl-2">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<button class="lg:hidden btn btn-sm" on:click={onOpenDrawer}>
				<span>
					<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</span>
			</button>

			<a
				href="/"
				on:click={resetFilters}
				class="hidden md:flex ml-4 rounded-full logo transition-shadow"
			>
				<img src={Logo} alt="VPS" width="36px" />
			</a>
		</div>
	</svelte:fragment>
	<div class="p-0 md:px-4 flex items-center gap-4 text-xs md:text-sm">
		<div class="input-group input-group-divider grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim !hidden md:!flex"><Fa icon={faSearch} /></div>
			<input type="search" placeholder="Search..." bind:value={$query} />
			<select class="select rounded-l-none text-xs md:text-sm" bind:value={$mode}>
				{#each modes as mode}
					<option value={mode[0]}>{mode[1].name}</option>
				{/each}
			</select>
		</div>

		<button
			class="flex btn hover:variant-soft-primary btn-icon"
			class:variant-filled-primary={$filterActive}
			on:click={() => ($filterActive = !$filterActive)}
		>
			<Fa icon={faFilter} />
		</button>

		<button class="btn btn-sm hover:variant-soft-primary" use:popup={popupSort}>
			Sort <Fa icon={faSort} class="ml-2" size="xs" />
		</button>

		<button
			class="flex btn hover:variant-soft-primary btn-icon"
			class:opacity-30={!$isSearchActive}
			disabled={!$isSearchActive}
			use:clipboard={shareUrl}
			on:click={() => {
				getToastStore().trigger({ message: 'Share link copied to clipboard.' });
			}}
			title="Copy share link"
		>
			<Fa icon={faArrowUpFromBracket} />
		</button>
	</div>

	<div slot="trail" class="hidden lg:flex mr-4 items-center gap-4">
		<Navigation />
	</div>
</AppBar>

<style>
	.logo:hover {
		box-shadow: 0px 0px 10px 0px rgb(var(--color-primary-500) / 1);
	}
</style>
