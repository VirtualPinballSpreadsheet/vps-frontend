import { page } from '$app/stores';
import GameModal from '$lib/components/GameModal.svelte';
import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';

const modalComponent: ModalComponent = {
	// Pass a reference to your custom component
	ref: GameModal,
	// Provide a template literal for the default component slot
	slot: '<p>Skeleton</p>'
};

page.subscribe((e) => {
	const params = e?.url?.searchParams;
	if (!params) return;
	const game = params.get('game');
	if (!game) return;

	const modal: ModalSettings = {
		type: 'component',
		meta: { game },
		// Pass the component directly:
		component: modalComponent
	};
	modalStore.trigger(modal);
});
