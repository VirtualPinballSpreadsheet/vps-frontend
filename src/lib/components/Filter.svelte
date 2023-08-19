<script lang="ts">
	import { Search } from '$lib/stores/SearchStore';
	import FilterChips from './FilterChips.svelte';

	const { manufacturer, theme, author, features } = Search;
</script>

<div class="p-4 flex">
	<div class="p-4 card w-full border-primary-600 border flex gap-4">
		<FilterChips store={features} title="Features" />
		<FilterChips store={author} title="Author" />
		<FilterChips store={manufacturer} title="Manufacturer" />
		<FilterChips store={theme} title="Theme" />
	</div>
</div>
