<script lang="ts">
	import { getURLIcon } from '$lib/helper/getURLIcon';
	import type { FileUrl } from '$lib/types/VPin';
	import Fa from 'svelte-fa';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let urls: FileUrl[] = [];
</script>

<label class="label">
	<span>URLs</span>
	{#each urls || [] as url, i}
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><Fa icon={getURLIcon(url).icon} /></div>

			<input
				class="input"
				value={url.url}
				on:blur={() => dispatch('blur', urls)}
				on:change={(e) => {
					debugger;
					if (!e.target.value) {
						urls = [...urls.slice(0, i), ...urls.slice(i + 1, urls.length)];
					} else {
						urls[i].url = e.target.value;
						urls = urls;
					}
				}}
			/>
			<button
				class="variant-{url.broken ? 'filled-error' : 'soft-surface'}"
				on:click={() => {
					dispatch('blur');
					url.broken = !url.broken;
				}}>Broken</button
			>
		</div>
	{/each}
	<input
		class="input"
		value=""
		on:blur={() => dispatch('blur', urls)}
		on:change={(e) => {
			if (!Array.isArray(urls)) urls = [];
			urls.push({ url: e.target.value, broken: false });
			urls = urls;
			e.target.value = '';
		}}
	/>
</label>
