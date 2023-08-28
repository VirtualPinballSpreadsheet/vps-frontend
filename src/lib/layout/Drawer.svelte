<script lang="ts">
	import { Accordion, AccordionItem, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Navigation from './Navigation.svelte';
	import { User } from '$lib/stores/UserStore';
	import CurrentEdits from './admin/CurrentEdits.svelte';
	import Logo from '$lib/assets/img/vpsLogo.png';
	import UpdateDb from './admin/UpdateDB.svelte';

	const { userStore } = User;

	const drawerStore = getDrawerStore();

	const closeDrawer = () => {
		drawerStore.close();
	};
</script>

<Drawer>
	<div class="flex flex-col p-6 items-start gap-4">
		<a href="/" class="btn btn-sm flex gap-4 items-center" on:click={closeDrawer}>
			<img src={Logo} alt="VPS" width="36px" />
			<h4 class="h4">VPS</h4>
		</a>
		<hr class="hr w-[calc(100%+3rem)] -mx-6" />
		{#if $userStore.admin}
			<div class="-mx-2 w-[calc(100%+1rem)]">
				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="summary">Editing</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="w-full py-2 flex flex-col gap-8">
								<CurrentEdits />
								<UpdateDb />
							</div>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</div>
			<hr class="hr w-[calc(100%+3rem)] -mx-6" />
		{/if}

		<Navigation {closeDrawer} />
	</div>
</Drawer>
