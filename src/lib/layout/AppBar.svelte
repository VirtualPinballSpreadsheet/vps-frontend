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
	const { query, mode } = Search;

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
		<a href="/">
			<img src={Logo} alt="VPS" width="36px" class="ml-4" />
		</a>
	</svelte:fragment>
	<div class="px-4 flex items-center gap-4">
		<div class="input-group grid-cols-[auto_1fr_auto] border-none">
			<div><Fa icon={faSearch} /></div>
			<input type="search" placeholder="Search..." bind:value={$query} />
			<select class="select" bind:value={$mode}>
				{#each modes as mode}
					<option value={mode[0]}>{mode[1].name}</option>
				{/each}
			</select>
		</div>
		<button class="btn hover:variant-soft-primary btn-icon">
			<Fa icon={faFilter} />
		</button>
	</div>

	<div slot="trail" class="mr-4 flex items-center gap-4">
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
