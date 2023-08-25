<script lang="ts">
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

	import { nanoid } from 'nanoid';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	const id = nanoid();

	export let title = '???';

	const popupSetting: PopupSettings = {
		event: 'click',
		target: id,
		placement: 'bottom'
	};
</script>

<button class="flex gap-2 items-center" use:popup={popupSetting}
	><slot /> <Fa size="16" icon={faInfoCircle} /></button
>
<div
	class="card p-3 variant-filled-surface z-50 border-primary-500 border shadow-lg max-w-full w-60"
	data-popup={id}
>
	<slot name="help" />
	<div class="arrow variant-filled-surface border-primary-500 border-s border-l border-t" />
</div>
