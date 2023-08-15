import type { Game } from '$lib/types/VPin';
import Placeholder from '../assets/img/bgPlaceholder.jpg';

export const getBackglassUrl = (game?: Game): string => {
	if (!game) return Placeholder;

	if (game.imgUrl) return game.imgUrl;

	const b2s = game.b2sFiles || [];
	if (b2s.length) {
		const b2sel = [...b2s].sort((a, b) => b.updatedAt - a.updatedAt).find((el) => el.imgUrl);
		if (b2sel) return b2sel.imgUrl!;
	}

	const tableF = game.tableFiles || [];
	if (tableF.length) {
		const tel = [...tableF].sort((a, b) => b.updatedAt - a.updatedAt).find((el) => el.imgUrl);
		if (tel) return tel.imgUrl!;
	}

	return Placeholder;
};

export const hasBackglassUrl = (game?: Game): boolean => {
	if (!game) return false;

	const b2s = game.b2sFiles || [];
	const tableF = game.tableFiles || [];

	if (game.imgUrl) return true;

	if (b2s.length) {
		const b2sel = [...b2s].sort((a, b) => b.updatedAt - a.updatedAt).find((el) => el.imgUrl);
		if (b2sel) return true;
	}
	if (tableF.length) {
		const tel = [...tableF].sort((a, b) => b.updatedAt - a.updatedAt).find((el) => el.imgUrl);
		if (tel) return true;
	}

	return false;
};
