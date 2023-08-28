<script lang="ts">
	import InfiniteScrollPage from '$lib/layout/InfiniteScrollPage.svelte';
	import { Search } from '$lib/stores/SearchStore';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { finalResultsStore, mode } = Search;

	onMount(() => {
		if ($mode !== data.mode) {
			mode.set(data.mode);
		}
	});
</script>

<InfiniteScrollPage
	component={data.component}
	title={data.name}
	data={$finalResultsStore}
	transformData={(t) => {
		return {
			file: t,
			fileType: data.mode,
			href:
				data.mode === 'game'
					? `?game=${t.id}`
					: `?game=${t.game?.id}&fileType=${data.route}&fileId=${t.id}`
		};
	}}
/>
