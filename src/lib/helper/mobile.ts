import { writable } from 'svelte/store';

export const mobile = writable({
	width: 0,
	height: 0,
	mobile: false
});
