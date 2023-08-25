<script>
	import { Avatar, LightSwitch, getToastStore } from '@skeletonlabs/skeleton';
	import { User } from '$lib/stores/UserStore';
	const toastStore = getToastStore();
	const { userStore } = User;

	const onLogin = async () => {
		const res = await User.triggerLoginPopup();
		if (res) {
			if ($userStore.admin) {
				toastStore.trigger({
					message: 'Login successfull',
					background: 'variant-filled-success'
				});
			} else {
				toastStore.trigger({
					message: "You don't have permission to edit on VPS.",
					background: 'variant-filled-error'
				});
			}
		} else {
			toastStore.trigger({
				message: 'Login was unsuccessfull.',
				background: 'variant-filled-error'
			});
		}
	};
	const onLogout = async () => {
		await User.logout();
		toastStore.trigger({
			message: 'Logout successfull',
			background: 'variant-filled-success'
		});
	};
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
			<button class="btn btn-sm variant-ghost-surface" on:click={onLogin}> Admin Login </button>
		{:else}
			<div class="space-x-2 flex items-center">
				<Avatar src={$userStore.user.photoURL || ''} width="w-6" rounded="rounded-full" />
				<span>
					{$userStore.user.displayName}
				</span>
			</div>
			<button class="btn w-full variant-filled-secondary" on:click={onLogout}>Logout</button>
		{/if}
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
