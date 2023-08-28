<script lang="ts">
	import { initializeStores, setInitialClassState } from '@skeletonlabs/skeleton';
	initializeStores();
	import '../app.scss';
	import '../app.postcss';
	import '@fontsource/jost';
	import '@fontsource/tomorrow';

	// Popups
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal, storePopup } from '@skeletonlabs/skeleton';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';

	import AppBar from '$lib/layout/AppBar.svelte';
	import '$lib/stores/SearchStore';
	import '$lib/stores/RouteStore';
	import '$lib/stores/ModalStore.svelte';
	import Popups from '$lib/components/Popups.svelte';
	import { onMount } from 'svelte';
	import { DB } from '$lib/stores/DbStore';
	import ModalStore from '$lib/stores/ModalStore.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import { Search } from '$lib/stores/SearchStore';
	import SidebarLeft from '$lib/layout/SidebarLeft.svelte';
	import Drawer from '$lib/layout/Drawer.svelte';
	import { User } from '$lib/stores/UserStore';
	import ResizeObserver from '$lib/components/resizeObserver.svelte';
	import ContextMenu from '$lib/components/ContextMenu.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const { filterActive } = Search;
	const { userStore } = User;

	onMount(() => {
		DB.fetchDb();
		setInitialClassState();
	});
</script>

<ResizeObserver />
<Popups />
<Modal />
<Toast zIndex="1000" />
<ModalStore />
<Drawer />
<AppShell slotSidebarLeft={$userStore.admin ? 'bg-surface-500/5 w-0 lg:w-64' : ''}>
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		{#if $filterActive}
			<Filter />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $userStore.admin}
			<SidebarLeft />
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight"><SideBarRight /></svelte:fragment> -->

	<!-- Page Route Content -->
	<slot />
</AppShell>
<ContextMenu />
