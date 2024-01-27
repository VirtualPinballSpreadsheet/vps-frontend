<script>
	import { faCopy } from '@fortawesome/free-solid-svg-icons';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	export let id = '';
</script>

<button
	class="chip badge-glass py-0.5 px-1 cursor-pointer"
	use:clipboard={id}
	on:click={() => {
		getToastStore().trigger({ message: `${id} copied to clipboard.` });
	}}
>
	{id}
	<Fa icon={faCopy} size="8" class="ml-2" />
</button>
