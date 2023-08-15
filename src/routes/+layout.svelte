<script lang="ts">
	import '../app.scss';
	// Your custom Skeleton theme:
	import '../theme.postcss';
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// Popups
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal, storePopup } from '@skeletonlabs/skeleton';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';

	import AppBar from '$lib/layout/AppBar.svelte';
	import '$lib/stores/RouteStore';
	import '$lib/stores/ModalStore';
	import Popups from '$lib/components/Popups.svelte';
	import { onMount } from 'svelte';
	import { DB } from '$lib/stores/DbStore';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(() => {
		DB.fetchDb();
	});
</script>

<Popups />
<Toast />
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft"><SidebarLeft /></svelte:fragment>
		<svelte:fragment slot="sidebarRight"><SideBarRight /></svelte:fragment> -->

	<!-- Page Route Content -->
	<slot />
</AppShell>
