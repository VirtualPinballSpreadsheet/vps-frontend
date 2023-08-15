<script>
	import { User } from '$lib/stores/UserStore';
	import { Avatar } from '@skeletonlabs/skeleton';

	const { userStore } = User;
</script>

<div class="card p-4 w-72 shadow-xl popup" data-popup="popupUser">
	<div class="flex flex-col space-y-2">
		<Avatar src={$userStore.user?.photoURL || ''} width="w-12" rounded="rounded-full" />
		<b>{$userStore.user?.displayName}</b>
		<button class="btn w-full variant-filled-secondary" on:click={User.logout}>Logout</button>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
