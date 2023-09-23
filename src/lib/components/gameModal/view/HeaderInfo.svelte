<script lang="ts">
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

	import { nanoid } from 'nanoid';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	const id = nanoid(10);

	export let title = '???';

	const popupSetting: PopupSettings = {
		event: 'click',
		target: id,
		placement: 'bottom'
	};
</script>

<div class=" flex items-end gap-4">
	<button class="h3 flex gap-2" use:popup={popupSetting}
		>{title} <Fa size="16" style="margin-top:.6rem;" icon={faInfoCircle} /></button
	>
</div>
<div
	class="card p-3 variant-filled-surface z-50 border-primary-500 border shadow-lg"
	data-popup={id}
>
	<slot />
	<div class="arrow variant-filled-surface border-primary-500 border-s border-l border-t" />
</div>
