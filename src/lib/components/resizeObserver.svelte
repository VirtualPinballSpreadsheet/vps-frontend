<script lang="ts">
	import { mobile } from '$lib/helper/mobile';
	import { onMount } from 'svelte';

	onMount(() => {
		const listener = () => {
			mobile.set({
				width: window.innerWidth,
				height: window.innerHeight,
				// Tailwind breakpoint md
				mobile: window.innerWidth <= 768
			});
		};

		listener();
		window.addEventListener('resize', listener);

		return () => {
			window.removeEventListener('resize', listener);
		};
	});
</script>
