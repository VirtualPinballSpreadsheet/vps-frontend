import { get } from 'svelte/store';
import { Search } from './SearchStore';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { modeMapping } from '$lib/helper/modeMapping';

Search.finalResultsStore.subscribe(() => {
	// const q = get(Search.query);
	// const fa = get(Search.filterActive);
	// if (!q && !fa) return;
	const _page = get(page);
	const path = _page?.url?.pathname;
	if (!path) return;
	if (path === '/export') return;
	if (!get(Search.isSearchActive) && path === '/') return;
	const mode = get(Search.mode);
	const route = modeMapping[mode].route;
	if (path?.includes(route)) return;
	goto('/' + route, { keepFocus: true });
});
