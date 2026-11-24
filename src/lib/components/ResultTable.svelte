<script lang="ts">
	import { goto } from '$app/navigation';
	import Fa from 'svelte-fa';
	import {
		faCheck,
		faChevronDown,
		faChevronUp,
		faAnglesLeft,
		faAnglesRight,
		faChevronLeft,
		faChevronRight,
		faComment,
		faImage,
		faTriangleExclamation
	} from '@fortawesome/free-solid-svg-icons';
	import Placeholder from '$lib/assets/img/bgPlaceholder.jpg';
	import { formatDate } from '$lib/helper/formatDate';
	import { getURLIcon } from '$lib/helper/getURLIcon';
	import {
		getColumns,
		pageCount,
		pageSlice,
		clampPage,
		rangeLabel,
		sortRows,
		linkLabel,
		type ColumnDef,
		type SortState
	} from '$lib/helper/columns';
	import { rowsPerPage } from '$lib/stores/ViewStore';
	import type { Mode } from '$lib/types/Filter';

	export let mode: Mode;
	export let items: any[] = [];
	// Deep link for a row (the game modal, optionally scrolling to the file)
	export let hrefFor: (item: any) => string = () => '';

	// SvelteKit reuses this component when the route switches modes, so the
	// columns (and the local sort, which refers to old column ids) must be
	// recomputed when `mode` changes.
	$: columns = getColumns(mode);
	let prevMode: Mode | undefined;
	let sort: SortState | null = null;
	$: if (mode !== prevMode) {
		prevMode = mode;
		sort = null;
	}
	let page = 1;

	// Hover overlay, shared by the picture and note glyphs. Images are ~1k px,
	// so rows never load them: the preview (one at a time) fetches on hover,
	// exactly like the grid cards' hover backdrops. Rendered as a single
	// fixed overlay: the table wrapper needs overflow-x-auto, which also
	// makes overflow-y clip, so an absolutely positioned popup inside the
	// rows would be cut off at the table edges. Fixed positioning escapes that.
	let preview: { src?: string; text?: string; top: number; left: number } | null = null;
	const PREVIEW_W = 224;
	const PREVIEW_H = 170; // backglass-ish aspect at PREVIEW_W + margin
	const previewPos = (e: MouseEvent, estH = PREVIEW_H) => {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		let top = r.bottom + 6;
		if (top + estH > window.innerHeight) top = Math.max(8, r.top - estH - 6);
		const left = Math.min(r.left, window.innerWidth - PREVIEW_W - 8);
		return { top, left };
	};
	const onThumbEnter = (e: MouseEvent, src: string) => (preview = { src, ...previewPos(e) });
	const onNoteEnter = (e: MouseEvent, text: string) => (preview = { text, ...previewPos(e, 120) });
	const onThumbLeave = () => (preview = null);

	// The search pipeline can yield holes (files whose game is missing) — the
	// grid tolerates them, the table skips them.
	$: rows = (items ?? []).filter((i) => !!i);

	// New results (search/filter change): back to page 1; the column sort is
	// kept since it is applied on top of whatever order arrives.
	$: if (items) {
		page = 1;
		preview = null;
	}

	$: sorted = sortRows(rows, columns, sort);
	$: pages = pageCount(sorted.length, $rowsPerPage);
	$: page = clampPage(page, sorted.length, $rowsPerPage);
	$: slice = pageSlice(sorted, page, $rowsPerPage);

	// header click cycles: asc -> desc -> (off, back to the global order)
	const onHeader = (colId: string) => {
		if (sort?.colId !== colId) sort = { colId, dir: 'asc' };
		else if (sort.dir === 'asc') sort = { colId, dir: 'desc' };
		else sort = null;
	};

	const onRow = (item: any, e: MouseEvent) => {
		// let clicks on real links inside the row use their own navigation
		if ((e.target as HTMLElement).closest('a')) return;
		const href = hrefFor(item);
		if (href) goto(href);
	};

	const thumbSrc = (col: ColumnDef, item: any): string => col.getThumb?.(item) || Placeholder;

	// Comment glyph: same hover-overlay trick as the picture glyph (Skeleton's
	// popup would be clipped by the table wrapper's overflow)
	const commentText = (col: ColumnDef, item: any): string => String(col.getValue(item) ?? '');

	// Links cells: chip labels (VPU/VPF/GDrive/IPDB/Ext/...) + tooltips
	const linksFor = (col: ColumnDef, item: any) =>
		(col.getLinks?.(item) ?? []).map((u) => {
			const meta = getURLIcon(u);
			return { url: u.url, title: linkLabel(u), tooltip: meta.tooltip, class: meta.class };
		});

	const cellText = (colId: string, item: any): string => {
		const col = columns.find((c) => c.id === colId)!;
		const v = col.getValue(item);
		return v === undefined || v === null ? '' : String(v);
	};

	const cellDate = (colId: string, item: any): string => {
		const v = columns.find((c) => c.id === colId)!.getValue(item);
		return v === undefined || v === null || v === '' ? '' : formatDate(v as number);
	};

	const isSortable = (col: ColumnDef): boolean => col.sortable !== false;
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b-2 border-surface-400/40">
				{#each columns as col (col.id)}
					<th
						class="text-left uppercase text-xs font-bold tracking-wide opacity-70 py-2 px-2 whitespace-nowrap"
						class:cursor-pointer={isSortable(col)}
						class:select-none={isSortable(col)}
						class:group-hover:opacity-100={isSortable(col)}
						on:click={() => isSortable(col) && onHeader(col.id)}
						on:keydown={(e) => isSortable(col) && e.key === 'Enter' && onHeader(col.id)}
						role={isSortable(col) ? 'button' : undefined}
						tabindex={isSortable(col) ? 0 : undefined}
						title={isSortable(col) ? `Sort by ${col.header}` : undefined}
					>
						{col.header}
						{#if sort?.colId === col.id}
							<Fa icon={sort.dir === 'asc' ? faChevronUp : faChevronDown} size="xs" />
						{/if}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="table-body">
			{#each slice as item, i (item.id ?? i)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<tr
					class="border-b border-surface-400/20 hover:bg-surface-50 dark:hover:bg-surface-600 cursor-pointer"
					on:click={(e) => onRow(item, e)}
				>
					{#each columns as col (col.id)}
						<td class="py-1.5 px-2 align-middle max-w-xs">
							{#if col.kind === 'name'}
								<div class="flex items-center gap-2 min-w-0">
									{#if col.getThumb}
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="shrink-0 opacity-60 hover:opacity-100"
											title="Hover for picture"
											on:mouseenter={(e) => onThumbEnter(e, thumbSrc(col, item))}
											on:mouseleave={onThumbLeave}
										>
											<Fa icon={faImage} size="sm" />
										</div>
									{/if}
									<a
										href={hrefFor(item)}
										class="font-bold whitespace-nowrap hover:text-primary-500 text-ellipsis overflow-hidden"
									>
										{col.getText ? col.getText(item) : cellText(col.id, item)}
									</a>
									{#if item.broken && mode !== 'game'}
										<span title="broken" class="shrink-0 text-error-500">
											<Fa icon={faTriangleExclamation} size="xs" />
										</span>
									{/if}
								</div>
							{:else if col.kind === 'check'}
								{#if col.getValue(item) === true}
									<Fa icon={faCheck} size="xs" class="text-primary-500" />
								{/if}
							{:else if col.kind === 'date'}
								{cellDate(col.id, item)}
							{:else if col.kind === 'comment'}
								{#if commentText(col, item)}
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<div
										class="shrink-0 opacity-60 hover:opacity-100"
										title="Hover for note"
										on:mouseenter={(e) => onNoteEnter(e, commentText(col, item))}
										on:mouseleave={onThumbLeave}
									>
										<Fa icon={faComment} size="sm" />
									</div>
								{/if}
							{:else if col.kind === 'count'}
								<span
									class="tabular-nums"
									class:opacity-30={col.getValue(item) === 0}
									title="{col.header}: {col.getValue(item)}">{col.getValue(item)}</span
								>
							{:else if col.kind === 'links'}
								<div class="flex flex-wrap gap-1">
									{#each linksFor(col, item) as link (link.url)}
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											title={link.tooltip}
											class="chip {link.class} !py-0 !px-1.5 !text-xs whitespace-nowrap"
										>
											{link.title}
										</a>
									{/each}
								</div>
							{:else}
								<span class="opacity-80 text-ellipsis overflow-hidden whitespace-nowrap block">
									{cellText(col.id, item)}
								</span>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm">
	<div class="flex items-center gap-2">
		<span class="opacity-60">Rows per page</span>
		<select class="select w-24" bind:value={$rowsPerPage}>
			<option value={25}>25</option>
			<option value={50}>50</option>
			<option value={100}>100</option>
			<option value={250}>250</option>
			<option value={0}>All</option>
		</select>
	</div>
	<div class="flex items-center gap-1">
		<span class="opacity-60 mr-2">{rangeLabel(sorted.length, page, $rowsPerPage)}</span>
		<button
			class="btn btn-sm btn-icon"
			disabled={page <= 1}
			on:click={() => (page = 1)}
			title="First page"><Fa icon={faAnglesLeft} size="xs" /></button
		>
		<button
			class="btn btn-sm btn-icon"
			disabled={page <= 1}
			on:click={() => (page -= 1)}
			title="Previous page"><Fa icon={faChevronLeft} size="xs" /></button
		>
		<span class="opacity-80 whitespace-nowrap">{page} / {pages}</span>
		<button
			class="btn btn-sm btn-icon"
			disabled={page >= pages}
			on:click={() => (page += 1)}
			title="Next page"><Fa icon={faChevronRight} size="xs" /></button
		>
		<button
			class="btn btn-sm btn-icon"
			disabled={page >= pages}
			on:click={() => (page = pages)}
			title="Last page"><Fa icon={faAnglesRight} size="xs" /></button
		>
	</div>
</div>

{#if preview}
	{#if preview.src}
		<img
			src={preview.src}
			alt=""
			decoding="async"
			class="fixed z-50 w-56 rounded-lg shadow-2xl shadow-black border border-surface-400/40 bg-surface-600 pointer-events-none"
			style="top: {preview.top}px; left: {preview.left}px;"
		/>
	{:else}
		<!-- variant-filled-surface (like Tooltip): the surface palette is dark in
			 both modes, so the text needs the palette's contrast color, not the
			 theme's, which is dark in light mode -->
		<div
			class="fixed z-50 max-w-xs rounded-lg shadow-2xl shadow-black border border-surface-400/40 variant-filled-surface p-3 text-sm whitespace-pre-line pointer-events-none"
			style="top: {preview.top}px; left: {preview.left}px;"
		>
			{preview.text}
		</div>
	{/if}
{/if}

<style>
	/* With "All" rows (or 250) the DOM can hold thousands of rows;
	   content-visibility lets the browser skip layout/paint for offscreen
	   rows, keeping scrolling and find-in-page snappy. Browsers without
	   support ignore it. */
	.table-body tr {
		content-visibility: auto;
		contain-intrinsic-size: auto 45px;
	}
</style>
