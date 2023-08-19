<script>
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';

	export let id = '';
</script>

<button
	class="chip badge-glass py-0.5 px-1"
	use:clipboard={id}
	on:click={() => {
		getToastStore().trigger({ message: `${id} copied to clipboard.` });
	}}
>
	{id}
</button>
