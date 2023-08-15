<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		goto($page.url.pathname);
	});
</script>

<div class="card p-4">{$modalStore[0]?.meta?.game}</div>
