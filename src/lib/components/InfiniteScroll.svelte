<script lang="ts">
	//@ts-nocheck
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	export let threshold = 0;
	export let horizontal = false;
	export let elementScroll: Element | null = null;
	export let hasMore = true;
	export let reverse = false;
	export let window = false;
	const dispatch = createEventDispatcher();
	let isLoadMore = false;
	let component;
	let beforeScrollHeight;
	let beforeScrollTop;
	let element;
	$: if (element) {
		if (reverse) {
			element.scrollTop = element.scrollHeight;
		}
		element.addEventListener('scroll', onScroll);
		element.addEventListener('resize', onScroll);
	}
	$: if (isLoadMore && reverse) {
		element.scrollTop = element.scrollHeight - beforeScrollHeight + beforeScrollTop;
	}
	const onScroll = (e) => {
		if (!hasMore) return;
		const target = e.target;
		const offset = calcOffset(target, reverse, horizontal);
		if (offset <= threshold) {
			if (!isLoadMore && hasMore) {
				dispatch('loadMore');
				beforeScrollHeight = target.scrollHeight;
				beforeScrollTop = target.scrollTop;
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};
	const calcOffset = (target, reverse, horizontal) => {
		const element = target.documentElement ? target.documentElement : target;
		if (reverse) {
			return horizontal ? element.scrollLeft : element.scrollTop;
		}
		return horizontal
			? element.scrollWidth - element.clientWidth - element.scrollLeft
			: element.scrollHeight - element.clientHeight - element.scrollTop;
	};
	onMount(() => {
		if (window) {
			element = document;
		} else if (elementScroll) {
			element = elementScroll;
		} else {
			element = component.parentNode;
		}
	});
	onDestroy(() => {
		if (element) {
			element.removeEventListener('scroll', onScroll);
			element.removeEventListener('resize', onScroll);
		}
	});
</script>

{#if !window && !elementScroll}
	<div bind:this={component} id="svelte-infinite-scroll" style="width: 0;" />
{/if}
