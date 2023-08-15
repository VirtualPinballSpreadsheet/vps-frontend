<script>
	import { Avatar, LightSwitch, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { User } from '$lib/stores/UserStore';

	const { userStore } = User;

	let comboboxValue = 'books';
</script>

<div class="card 8 shadow-xl popup" data-popup="popupSettings">
	<div class="p-4">
		<div class="flex justify-between items-center gap-8 text-sm">
			Toggle Dark/Light <LightSwitch />
		</div>
	</div>
	<hr />
	<div class="p-4 flex flex-col gap-4">
		{#if !$userStore.user}
			<button class="btn btn-sm variant-ghost-surface" on:click={User.triggerLoginPopup}>
				Admin Login
			</button>
		{:else}
			<div class="space-x-2 flex items-center">
				<Avatar src={$userStore.user.photoURL || ''} width="w-6" rounded="rounded-full" />
				<span>
					{$userStore.user.displayName}
				</span>
			</div>
			<button class="btn w-full variant-filled-secondary" on:click={User.logout}>Logout</button>
		{/if}
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
