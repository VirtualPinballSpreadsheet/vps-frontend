<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { mobile } from '$lib/helper/mobile';

	export let title = '';
	export let data: Object[] = [];
	export let component: ConstructorOfATypedSvelteComponent;
	export let href = '';
	export let size = 250;
	export let overflow = 4;
	export let gap = 1.5;
	export let num: number | undefined = undefined;

	let scrollerWidth = window.innerWidth;
	let scroller: Element;
	let page = 0;
	let blocked = false;

	$: count = Math.ceil(scrollerWidth / size);
	$: _size = scrollerWidth / count < size ? count : count + 1;
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
		blocked = true;
		el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		page = i;
		setTimeout(() => (blocked = false), 1000);
	};
</script>

<div
	class="flex flex-col items-start -mx-10 wrapper"
	style="width:calc(100% + 5rem)"
	class:pointer-events-none={blocked}
	bind:this={scroller}
>
	<!-- HEADER -->
	<div class="flex justify-between items-center w-full">
		<a
			{href}
			class="flex items-end gap-2 transition-colors group"
			style="margin-left:{overflow}rem;"
		>
			<h4 class="h4">{title}</h4>
			{#if num !== undefined}
				<h4 class="opacity-40">{num}</h4>
			{/if}
			<div class="flex items-center mb-0.5">
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
		<!-- Pagination -->
		<div
			class="hidden md:flex gap-px opacity-0 dots transition-opacity w-20"
			style="margin-right:{overflow}rem;"
		>
			{#each pages as _, i}
				<div class="h-0.5 bg-surface-900-50-token flex-1 {page === i ? '' : 'opacity-20'}" />
			{/each}
		</div>
	</div>
	<!-- SCROLLER -->
	<div class="relative w-full">
		<div
			style="scroll-padding-inline:{overflow}rem; padding:1rem {overflow}rem; gap:{$mobile.mobile
				? gap / 2
				: gap}rem;"
			class="scroller grid grid-flow-col overflow-x-scroll md:overflow-x-hidden w-full hide-scrollbar"
		>
			{#each pages as _, i}
				{@const items = data.slice(i * _size, (i + 1) * _size)}
				<div
					class="grid grid-flow-col auto-cols-fr select-none"
					style="gap:{$mobile.mobile ? gap / 2 : gap}rem;"
					id={title + i}
				>
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
				class=" absolute right-0 top-0 h-full hidden md:grid place-items-center text-xl bg-gradient-to-l from-slate-100 dark:from-gray-900 z-20 opacity-0 hover:opacity-100 transition-opacity"
				on:click={() => scrollTo(page + 1)}
			>
				<Fa icon={faChevronRight} size="lg" />
			</button>
		{/if}
		{#if page > 0}
			<button
				style="width:{overflow}rem;"
				class="absolute left-0 top-0 h-full hidden md:grid place-items-center text-xl bg-gradient-to-r from-slate-100 dark:from-gray-900 z-20 opacity-0 hover:opacity-100 transition-opacity"
				on:click={() => scrollTo(page - 1)}
			>
				<Fa icon={faChevronLeft} size="lg" />
			</button>
		{/if}
		<!-- Overhang -->
		<div
			style="width:{overflow - gap + 2.5}rem;"
			class="blur-lg absolute -left-10 -top-4 h-full bg-surface-50-900-token transition-opacity opacity-{page ===
			0
				? 0
				: 60} z-10"
		/>

		<div
			style="width:{overflow - gap + 2.5}rem;"
			class=" blur-lg absolute -right-10 -top-4 h-full bg-surface-50-900-token opacity-{page <
			pages.length - 1
				? 60
				: 0} transition-opacity z-10"
		/>
	</div>
</div>

<style>
	.scroller {
		grid-auto-columns: 100%;
	}

	.wrapper:hover .dots {
		opacity: 1;
	}
</style>
