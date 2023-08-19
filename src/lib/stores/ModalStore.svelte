<script lang="ts">
	import { page } from '$app/stores';
	import GameModal from '$lib/components/gameModal/GameModal.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: GameModal,
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	};

	$: {
		const params = $page?.url?.searchParams;
		if (params) {
			const game = params.get('game');
			if (game) {
				const modal: ModalSettings = {
					type: 'component',
					meta: { game },
					// Pass the component directly:
					component: modalComponent
				};

				const modalStore = getModalStore();
				modalStore.trigger(modal);
			}
		}
	}
</script>
