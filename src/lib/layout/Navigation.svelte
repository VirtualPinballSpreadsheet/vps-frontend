<script lang="ts">
	import { User } from '$lib/stores/UserStore';
	import Fa from 'svelte-fa';
	import { faChevronDown, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let closeDrawer = () => {};

	const { userStore } = User;

	const popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupSettings',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
	const popupAdmin: PopupSettings = {
		event: 'focus-click',
		target: 'popupAdmin',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

{#if $userStore.admin}
	<button
		class="btn btn-sm variant-soft-primary hover:variant-filled-primary"
		use:popup={popupAdmin}
	>
		Admin
	</button>
{/if}
<!-- <a href="apps/" class="btn btn-sm hover:variant-soft-primary" on:click={closeDrawer}> Apps </a>
<a href="links/" class="btn btn-sm hover:variant-soft-primary" on:click={closeDrawer}> Links </a> -->
<button class="btn btn-sm hover:variant-soft-primary" use:popup={popupSettings}>
	Tools <Fa icon={faChevronDown} class="ml-2" size="xs" />
</button>

<a href="/help" class="btn hover:variant-soft-primary btn-icon" on:click={closeDrawer}>
	<Fa icon={faCircleQuestion} />
</a>
