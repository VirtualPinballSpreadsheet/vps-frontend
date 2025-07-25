<script lang="ts">
	import type { FileUrl } from '$lib/types/VPin';
	import Fa from 'svelte-fa';
	import Tooltip from './Tooltip.svelte';
	import { getURLIcon } from '$lib/helper/getURLIcon';

	export let urls: FileUrl[] = [];

	$: _urls = urls.map((url) => getURLIcon(url)).filter((u) => !!u);
</script>

<div class="flex gap-1">
	{#each _urls as url}
		<Tooltip
			content={url.broken
				? 'This link is broken and needs to be updated. If you are aware of a working upload, please contact us!'
				: url.tooltip}
		>
		{#if url.broken}
			<span
				class="chip {url.class}"
				class:opacity-20={url.broken}
			><Fa icon={url.icon} />&nbsp;Broken</span>
		{:else}
			<a
				href={url.broken ? '' : url.url}
				target="_blank"
				class="chip {url.class}"
				class:opacity-20={url.broken}><Fa icon={url.icon} /><span>{url.title}</span></a
			>
		{/if}
		</Tooltip>
	{/each}
</div>
