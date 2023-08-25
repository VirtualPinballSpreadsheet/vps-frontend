<script lang="ts">
	import { page } from '$app/stores';
	import GameModal from '$lib/components/gameModal/GameModal.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = {
		ref: GameModal,
		slot: '<p>Skeleton</p>'
	};

	$: {
		const params = $page?.url?.searchParams;
		if (params) {
			const game = params.get('game');
			const edit = params.get('edit');
			const currentModal = get(modalStore)[0];
			const isOpen = currentModal?.meta?.type === 'gameModal';
			// console.log($modalStore, currentModal, isOpen, edit);
			if ((game || edit) && !isOpen) {
				const modal: ModalSettings = {
					type: 'component',
					meta: { game, edit, type: 'gameModal' },
					// Pass the component directly:
					component: modalComponent
				};

				modalStore.trigger(modal);
			} else if (!game && !edit) {
				modalStore.clear();
			}
		}
	}
</script>
