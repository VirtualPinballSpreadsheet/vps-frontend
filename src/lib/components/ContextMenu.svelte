<script lang="ts">
	import { List } from '$lib/stores/listStore';
	import { faList } from '@fortawesome/free-solid-svg-icons';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	const toastStore = getToastStore();

	let pos = { x: 0, y: 0 };
	let menu = { h: 0, y: 0 };
	let browser = { h: 0, y: 0 };
	let showMenu = false;

	let currentFile = { gameId: '', id: '', fileType: '' };

	function findAncestor(el) {
		while (el && !el?.dataset?.filetype) {
			el = el?.parentElement;
		}
		return el;
	}

	function rightClickContextMenu(e) {
		const idNode = findAncestor(e.target);
		const hasHighligtedText = window.getSelection()?.toString().length > 0;
		if (!idNode || hasHighligtedText) return;

		const id = idNode.id;
		const fileType = idNode.dataset.filetype;
		const gameId = idNode.dataset.gameid;
		if (!gameId || !fileType || !id) return;

		e.preventDefault();

		currentFile = { id, gameId, fileType };
		showMenu = true;
		browser = {
			w: window.innerWidth,
			h: window.innerHeight
		};
		pos = {
			x: e.clientX,
			y: e.clientY
		};
		if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
		if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
	}
	function onPageClick(e) {
		showMenu = false;
	}
	function getContextMenuDimension(node) {
		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width
		};
	}

	let menuItems = [
		{
			name: 'addToList',
			onClick: () => {
				const { gameId, fileType, id } = currentFile;
				if (!gameId || !fileType || !id) return;
				List.addToList('bookmarks', gameId, fileType, id);
				toastStore.trigger({
					message: 'Added file to list'
				});
			},
			displayText: 'Add to List',
			icon: faList
		}
	];
</script>

{#if showMenu}
	<nav
		use:getContextMenuDimension
		style="position: fixed; top:{pos.y}px; left:{pos.x}px; z-index:999"
	>
		<div class="card shadow-2xl flex flex-col items-start w-60" id="contextMenu">
			{#each menuItems as item}
				{#if item.name == 'hr'}
					<hr class="hr w-full h-px" />
				{:else}
					<button
						on:click={item.onClick}
						class="btn btn-md hover:bg-surface-hover-token w-full text-left items-center justify-start"
						><Fa icon={item.icon} class="mr-4" />{item.displayText}</button
					>
				{/if}
			{/each}
		</div>
	</nav>
{/if}

<svelte:window on:contextmenu={rightClickContextMenu} on:click={onPageClick} />
