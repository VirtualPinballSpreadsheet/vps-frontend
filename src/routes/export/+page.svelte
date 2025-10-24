<script lang="ts">
	import { Search } from '$lib/stores/SearchStore';
	import type { Game, TableFile } from '$lib/types/VPin';
	import { onMount } from 'svelte';
	import Spreadsheet from 'x-data-spreadsheet';

	import { utils, writeFile } from 'xlsx';
	import { transformPopper, transformPinx, type NameOptions, stox, transformRaw } from './csvMappings';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	const { finalResultsStore, mode } = Search;

	let state: NameOptions = {
		theAtEnd: true,
		edition: true,
		manufacturerYear: true,
		author: true,
		version: true,
		mod: true,
		vr: true
	};

	let type = 'popper';

	onMount(() => {
		// Fix mode
		$mode = 'tableFiles';
		// Add sheet
		utils.book_append_sheet(workbook, utils.json_to_sheet([]), 'lookup');

		// Init UI
		sheet = new Spreadsheet(sheetEl, {
			mode: 'read', // edit | read
			showToolbar: false,
			showGrid: true,
			showContextmenu: false,
			showBottomBar: false,
			view: {
				height: () => sheetEl?.clientHeight,
				width: () => sheetEl?.clientWidth
			},
			row: {
				len: 5000,
				height: 25
			},
			col: {
				len: 26,
				width: 300,
				indexWidth: 60,
				minWidth: 60
			},
			style: {
				bgcolor: '#ffffff',
				align: 'left',
				valign: 'middle',
				textwrap: false,
				strike: false,
				underline: false,
				color: '#0a0a0a',
				font: {
					name: 'Helvetica',
					size: 10,
					bold: false,
					italic: false
				}
			}
		});
	});

	const workbook = utils.book_new();
	let sheet: Spreadsheet;
	let sheetEl: HTMLElement;

	$: {
		if (sheet && $finalResultsStore?.length && $finalResultsStore[0].tableFormat) {
			let transformer
			switch (type) {
				case 'popper':
					transformer = transformPopper;
					break;
				case 'pinx':
					transformer = transformPinx;
					break;
				case 'raw':
					transformer = transformRaw;
					break;
				default:
					transformer = transformPopper;
					break;
			}
			let data = transformer($finalResultsStore as TableFile[], state);

			workbook.Sheets['lookup'] = utils.json_to_sheet(data);
			sheet?.loadData(stox(workbook));
		}
	}

	const exportCsv = () => {
		writeFile(workbook, type === 'popper' ? 'puplookup.csv' : 'pinballxdatabase.csv', {
			bookType: 'csv'
		});
	};
</script>

<div class="p-10 flex flex-col gap-8 h-full">
	<h3 class="h3">Export</h3>
	<p>You can export our database for either Pinup Popper or Pinball X.</p>

	<div class="card p-4 rounded-md">
		<p class="mb-4">The export will include all tables you have currently filtered for</p>
		<ul class="list">
			<li class="li">
				<span class="mr-8" />
				If you want to download the whole database, click the VPS Logo first to reset all filters.
			</li>
			<li class="li">
				<span class="mr-8" />If you want only VPX tables, set the feature filter to "VPX".
			</li>
			<li class="li">
				<span class="mr-8" />
				If you only want "Original" tables, set the author filter accordingly.
			</li>
		</ul>
	</div>

	<div class="flex flex-col gap-4">
		<b>Format Name</b>

		<div class="flex flex-col md:flex-row gap-4 items-center">
			<div class="btn-group-vertical md:btn-group variant-filled-surface">
				<button
					class:variant-filled-secondary={state.theAtEnd}
					on:click={() => (state.theAtEnd = !state.theAtEnd)}
				>
					", The" at the end</button
				>
				<button
					class:variant-filled-secondary={state.manufacturerYear}
					on:click={() => (state.manufacturerYear = !state.manufacturerYear)}>Manufacturer / Year</button
				>
				<button
					class:variant-filled-secondary={state.edition}
					on:click={() => (state.edition = !state.edition)}>Edition</button
				>
				<button
					class:variant-filled-secondary={state.author}
					on:click={() => {
						state.author = !state.author;
						state = state;
					}}>Author</button
				>
				<button
					class:variant-filled-secondary={state.version}
					on:click={() => (state.version = !state.version)}>Version</button
				>
				<button class:variant-filled-secondary={state.mod} on:click={() => (state.mod = !state.mod)}
					>MOD</button
				>
				<button class:variant-filled-secondary={state.vr} on:click={() => (state.vr = !state.vr)}
					>VR</button
				>
			</div>
			<RadioGroup>
				<RadioItem bind:group={type} name="popper" value="popper">Popper</RadioItem>
				<RadioItem bind:group={type} name="pinx" value="pinx">Pinball X</RadioItem>
				<RadioItem bind:group={type} name="raw" value="raw">Raw</RadioItem>
			</RadioGroup>
			<div class="flex-1" />
			<div class="font-bold">{$finalResultsStore?.length} tables</div>
			<button class="btn variant-filled-primary" on:click={exportCsv}>Export CSV</button>
		</div>
	</div>
	<div bind:this={sheetEl} class="w-full h-full flex-1 min-h-[40rem] rounded-md overflow-hidden" />
	<!-- <Table source={tableSimple} /> -->
</div>
