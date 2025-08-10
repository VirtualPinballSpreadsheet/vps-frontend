<script lang="ts">
	import { initializeStores, setInitialClassState, modeCurrent } from '@skeletonlabs/skeleton';
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
	import Filter from '$lib/components/filters/Filter.svelte';
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
		const elemHtmlClasses = document.documentElement.classList;
		$modeCurrent = elemHtmlClasses.contains('dark') ? false : true;
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

<!-- Global -->

<svg width="0" height="0">
	<defs>
		<clipPath id="myCurve" clipPathUnits="objectBoundingBox">
			<path d="M 0,1 L 0,0 L 1,0 L 1,1 C .6 .8, .4, 1.2, 0 1 Z" />
		</clipPath>
	</defs>
</svg>
