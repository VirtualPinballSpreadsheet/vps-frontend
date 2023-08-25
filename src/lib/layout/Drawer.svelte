<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton';
	import Navigation from './Navigation.svelte';
	import { User } from '$lib/stores/UserStore';
	import CurrentEdits from './admin/CurrentEdits.svelte';

	const { userStore } = User;
</script>

<Drawer>
	<div class="flex flex-col p-6 items-start gap-4">
		{#if $userStore.admin}
			<CurrentEdits />
		{/if}
		<Navigation />
	</div>
</Drawer>
