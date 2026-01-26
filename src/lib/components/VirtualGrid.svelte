<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let items: any[] = [];
	export let component: ConstructorOfATypedSvelteComponent;
	export let transformData = (d: any) => d;
	export let bufferRows = 3; // Number of rows to keep as buffer above/below viewport

	let scrollElement: HTMLElement | null = null;
	let gridElement: HTMLElement | null = null;
	let containerElement: HTMLElement | null = null;
	let scrollTop = 0;
	let estimatedRowHeight = 380; // Estimated height per row
	let columnsCount = 1;
	let startRow = 0;
	let endRow = 10;
	let measurementDone = false;

	// Calculate grid columns based on container width
	$: if (containerElement) {
		const updateColumns = () => {
			const width = containerElement?.clientWidth || 0;
			const isDesktop = window.innerWidth >= 768;
			const minItemWidth = isDesktop ? 200 : 120;
			const gap = isDesktop ? 40 : 16;
			columnsCount = Math.max(1, Math.floor((width + gap) / (minItemWidth + gap)));
		};
		updateColumns();
	}

	$: totalRows = Math.ceil(items.length / columnsCount);

	// Calculate visible range based on scroll position
	$: {
		if (scrollElement && measurementDone) {
			const viewportHeight = scrollElement.clientHeight;
			const rowsPerViewport = Math.ceil(viewportHeight / estimatedRowHeight);
			
			// Calculate which rows should be rendered
			const firstVisibleRow = Math.floor(scrollTop / estimatedRowHeight);
			
			startRow = Math.max(0, firstVisibleRow - bufferRows);
			endRow = Math.min(totalRows, firstVisibleRow + rowsPerViewport + bufferRows);
		}
	}

	$: startIndex = startRow * columnsCount;
	$: endIndex = Math.min(items.length, endRow * columnsCount);
	$: visibleItems = items.slice(startIndex, endIndex);
	$: totalHeight = totalRows * estimatedRowHeight;
	$: offsetY = startRow * estimatedRowHeight;

	const handleScroll = () => {
		if (!scrollElement) return;
		scrollTop = scrollElement.scrollTop;
	};

	const measureRowHeight = () => {
		if (!gridElement || measurementDone) return;
		
		// Wait for items to render
		requestAnimationFrame(() => {
			const items = gridElement?.querySelectorAll('.virtual-item');
			if (items && items.length >= columnsCount) {
				// Measure the height of the first row
				let maxHeight = 0;
				for (let i = 0; i < Math.min(columnsCount, items.length); i++) {
					const rect = items[i].getBoundingClientRect();
					maxHeight = Math.max(maxHeight, rect.height);
				}
				
				if (maxHeight > 0) {
					const isDesktop = window.innerWidth >= 768;
					const gap = isDesktop ? 80 : 40; // gap-y-20 = 80px, gap-y-10 = 40px
					estimatedRowHeight = maxHeight + gap;
					measurementDone = true;
				}
			}
		});
	};

	const handleResize = () => {
		measurementDone = false;
		setTimeout(measureRowHeight, 100);
	};

	onMount(() => {
		scrollElement = document.getElementById('page');
		
		if (scrollElement) {
			scrollElement.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll();
		}

		// Initial measurement
		setTimeout(measureRowHeight, 200);
		
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		if (scrollElement) {
			scrollElement.removeEventListener('scroll', handleScroll);
		}
		window.removeEventListener('resize', handleResize);
	});

	// Reset when items change
	$: if (items) {
		startRow = 0;
		endRow = Math.min(10, totalRows);
		measurementDone = false;
		if (scrollElement) {
			scrollElement.scrollTop = 0;
			scrollTop = 0;
		}
		setTimeout(measureRowHeight, 200);
	}

	// Re-measure when visible items change
	$: if (visibleItems && !measurementDone) {
		measureRowHeight();
	}
</script>

<div bind:this={containerElement} class="virtual-container" style="min-height: {totalHeight}px;">
	<div 
		bind:this={gridElement}
		class="grid layout gap-y-10 gap-x-4 md:gap-x-10 md:gap-y-20" 
		style="transform: translateY({offsetY}px); will-change: transform;"
	>
		{#each visibleItems as item, i (startIndex + i)}
			<div class="virtual-item">
				<svelte:component this={component} {...transformData(item)} />
			</div>
		{/each}
	</div>
</div>

<style>
	.virtual-container {
		position: relative;
		width: 100%;
	}

	.layout {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	}
	
	@media (min-width: 768px) {
		.layout {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}

	.virtual-item {
		contain: layout style paint;
	}
</style>
