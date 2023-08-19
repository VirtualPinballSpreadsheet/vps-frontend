<script lang="ts">
	import { AppBar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Logo from '$lib/assets/img/vpsLogo.png';
	import { User } from '$lib/stores/UserStore';
	import Fa from 'svelte-fa';
	import {
		faChevronDown,
		faCircleQuestion,
		faFilter,
		faSearch
	} from '@fortawesome/free-solid-svg-icons';
	import { Search } from '$lib/stores/SearchStore';
	import { modeMapping } from '$lib/helper/modeMapping';

	const { userStore } = User;
	const { query, mode, filterActive } = Search;

	const modes = Object.entries(modeMapping);

	const popupUser: PopupSettings = {
		event: 'click',
		target: 'popupUser',
		placement: 'bottom'
	};

	const popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupSettings',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="ml-4 rounded-full logo transition-shadow">
			<img src={Logo} alt="VPS" width="36px" />
		</a>
	</svelte:fragment>
	<div class="px-4 flex items-center gap-4">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><Fa icon={faSearch} /></div>
			<input type="search" placeholder="Search..." bind:value={$query} />
			<select class="select rounded-l-none" bind:value={$mode}>
				{#each modes as mode}
					<option value={mode[0]}>{mode[1].name}</option>
				{/each}
			</select>
		</div>

		<button
			class="btn hover:variant-soft-primary btn-icon"
			class:variant-filled-primary={$filterActive}
			on:click={() => ($filterActive = !$filterActive)}
		>
			<Fa icon={faFilter} />
		</button>
	</div>

	<div slot="trail" class="mr-4 flex items-center gap-4">
		{#if $userStore.admin}
			<a href="apps/" class="btn btn-sm variant-soft-primary hover:variant-filled-primary">
				Admin
			</a>
		{/if}
		<a href="apps/" class="btn btn-sm hover:variant-soft-primary"> Apps </a>
		<a href="links/" class="btn btn-sm hover:variant-soft-primary"> Links </a>
		<button class="btn btn-sm hover:variant-soft-primary" use:popup={popupSettings}>
			Settings <Fa icon={faChevronDown} class="ml-2" size="xs" />
		</button>

		<a href="help/" class="btn hover:variant-soft-primary btn-icon">
			<Fa icon={faCircleQuestion} />
		</a>
	</div>
</AppBar>

<style>
	.logo:hover {
		box-shadow: 0px 0px 10px 0px rgb(var(--color-primary-500) / 1);
	}
</style>
