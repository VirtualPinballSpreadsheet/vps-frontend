<script lang="ts">
	import '../app.scss';
	import '../app.postcss';
	import '@fontsource/jost';
	import '@fontsource/tomorrow';
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

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

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const { filterActive } = Search;

	onMount(() => {
		DB.fetchDb();
	});
</script>

<Popups />
<Modal />
<Toast zIndex="1000" />
<ModalStore />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		{#if $filterActive}
			<Filter />
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft"><SidebarLeft /></svelte:fragment>
		<svelte:fragment slot="sidebarRight"><SideBarRight /></svelte:fragment> -->

	<!-- Page Route Content -->
	<slot />
</AppShell>
