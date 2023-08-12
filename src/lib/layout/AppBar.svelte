<script lang="ts">
	import { AppBar, Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Logo from '$lib/assets/img/vpsLogo.png';
	import { User } from '$lib/stores/UserStore';
	import Fa from 'svelte-fa';
	import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

	const { userStore } = User;

	const popupUser: PopupSettings = {
		event: 'click',
		target: 'popupUser',
		placement: 'bottom'
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<img src={Logo} alt="VPS" width="36px" class="ml-4" />
	</svelte:fragment>
	<div class="px-4 flex items-center gap-4">
		<div class="input-group grid-cols-[auto_1fr_auto] border-none">
			<div><Fa icon={faSearch} /></div>
			<input type="search" placeholder="Search..." />
			<select class="select">
				<option value="1">Game</option>
				<option value="2">Table</option>
				<option value="3">B2s</option>
				<option value="4">PuP</option>
				<option value="4">Rom</option>
				<option value="5">Topper</option>
				<option value="5">Toppefffffffffr</option>
			</select>
		</div>
		<button>
			<Fa icon={faFilter} />
		</button>
	</div>

	<div slot="trail" class="mr-4">
		{#if !$userStore.user}
			<button class="btn btn-sm variant-ghost-surface" on:click={User.triggerLoginPopup}>
				Login
			</button>
		{:else}
			<button class="space-x-2 flex items-center" use:popup={popupUser}>
				<Avatar src={$userStore.user.photoURL || ''} width="w-6" rounded="rounded-full" />
				<span>
					{$userStore.user.displayName}
				</span>
			</button>
		{/if}
	</div>
</AppBar>
