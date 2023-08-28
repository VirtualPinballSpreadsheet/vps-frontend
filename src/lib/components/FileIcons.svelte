<script lang="ts">
	import type { Mode } from '$lib/types/Filter';
	import Fa from 'svelte-fa';
	import Icon from './Icon.svelte';
	import { modeMapping } from '$lib/helper/modeMapping';

	export let fileType: Mode = 'game';
</script>

{#if ['game', 'b2sFiles', 'tableFiles'].includes(fileType)}
	<Icon name={fileType} />
{:else}
	<Fa icon={modeMapping[fileType].icon} />
{/if}
