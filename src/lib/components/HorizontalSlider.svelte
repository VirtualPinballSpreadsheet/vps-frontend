<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	export let title = '';
	export let data: Object[] = [];
	export let component: ConstructorOfATypedSvelteComponent;
	export let href = '';
	export let size = 400;
	export let overflow = 4;

	let scrollerWidth = window.innerWidth;
	let scroller: Element;
	let page = 0;

	$: count = Math.ceil(scrollerWidth / size);
	$: _size = scrollerWidth / count < size ? count : count + 1;
	$: console.log(page);
	$: pages = new Array(Math.ceil(data.length / _size)).fill('');

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries.at(0);
			if (!entry) return;
			const newSize = entry.contentBoxSize[0].inlineSize;
			if (newSize === scrollerWidth) return;
			scrollerWidth = newSize;
		});

		resizeObserver.observe(scroller);

		return () => resizeObserver.unobserve(scroller);
	});

	const scrollTo = (i: number) => {
		const el = document.getElementById(title + i);
		el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		page = i;
	};
</script>

<div
	class="flex flex-col gap-4 items-start -mx-10"
	style="width:calc(100% + 5rem)"
	bind:this={scroller}
>
	<!-- HEADER -->
	<a
		{href}
		class="flex items-center gap-2 transition-colors group"
		style="margin-left:{overflow}rem;"
	>
		<h4 class="h4">{title}</h4>
		<div class="flex items-center">
			<p
				class="text-primary-500 transition-all opacity-0 font-bold text-sm -translate-x-4 group-hover:opacity-100 group-hover:text-primary-500 group-hover:translate-x-0"
			>
				Show All
			</p>
			<Fa
				icon={faChevronRight}
				class="-translate-x-14 transition-transform group-hover:translate-x-2 group-hover:text-primary-500 text-sm"
			/>
		</div>
	</a>
	<!-- SCROLLER -->
	<div class="relative w-full">
		<div
			style="scroll-padding-inline:{overflow}rem; padding:0 {overflow}rem"
			class="scroller grid grid-flow-col gap-2 overflow-x-hidden w-full"
		>
			{#each pages as _, i}
				{@const items = data.slice(i * _size, (i + 1) * _size)}
				<div class="grid grid-flow-col auto-cols-fr gap-2" id={title + i}>
					{#each items as d}
						<svelte:component this={component} {...d} />
					{/each}
					{#if items.length < _size}
						{#each new Array(_size - items.length).fill('') as d}
							<div />
						{/each}
					{/if}
				</div>
			{/each}
		</div>
		<!-- ARROW -->
		{#if page < pages.length - 1}
			<button
				style="width:{overflow}rem;"
				class="absolute right-0 top-0 h-full grid place-items-center text-xl bg-gradient-to-l from-gray-900 z-20 opacity-0 hover:opacity-100 transition-opacity"
				on:click={() => scrollTo(page + 1)}
			>
				<Fa icon={faChevronRight} size="lg" />
			</button>
		{/if}
		{#if page > 0}
			<button
				style="width:{overflow}rem;"
				class="absolute left-0 top-0 h-full grid place-items-center text-xl bg-gradient-to-r from-gray-900 z-20 opacity-0 hover:opacity-100 transition-opacity"
				on:click={() => scrollTo(page - 1)}
			>
				<Fa icon={faChevronLeft} size="lg" />
			</button>
		{/if}
		<!-- Overhang -->
		<div style="width:{overflow}rem;" class="absolute left-0 top-0 h-full bg-surface-900/60 z-10" />
		<div
			style="width:{overflow}rem;"
			class="absolute right-0 top-0 h-full bg-surface-900/60 z-10"
		/>
	</div>
</div>

<style>
	.scroller {
		grid-auto-columns: 100%;
	}
</style>