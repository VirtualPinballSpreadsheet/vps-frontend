<script lang="ts">
	import { Search } from '$lib/stores/SearchStore';
	import FilterChips from './FilterChips.svelte';
	import FilterYear from './FilterYear.svelte';

	const { manufacturer, theme, author, features, year } = Search;
</script>

<div class="p-4 flex">
	<div class="p-4 card w-full border-primary-600 border flex flex-col md:flex-row gap-4">
		<FilterChips store={features} title="Features" allowNegate />
		<FilterChips store={author} title="Author" allowNegate allowFirstOnly />
		<FilterChips store={manufacturer} title="Manufacturer" allowNegate />
		<FilterChips store={theme} title="Theme" allowNegate />
		<FilterYear store={year} title="Year" />
	</div>
</div>
