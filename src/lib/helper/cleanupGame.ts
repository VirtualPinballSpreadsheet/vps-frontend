import type { Game } from '$lib/types/VPin';
import { getLastCreatedAt, getLastUpdatedAt } from './getLastCreatedAt';

export const cleanupGame = (table: Game) => {
	let updatedAt = 0;
	filePaths.forEach((path) => {
		const ts = getLastUpdatedAt(table, path);
		if (ts > updatedAt) {
			updatedAt = ts;
		}
	});
	table.updatedAt = updatedAt;

	const lastCreatedAt = getLastCreatedAt(table, 'tableFiles');
	if (lastCreatedAt) table.lastCreatedAt = lastCreatedAt;

	return table;
};

const filePaths = [
	// "b2sFiles",
	'tableFiles'
	// "povFiles",
	// "romFiles",
	// "altColorFiles",
	// "altSoundFiles",
	// "pupPackFiles",
	// "wheelArtFiles",
	// "topperFiles",
	// "mediaPackFiles",
	// "soundFiles",
	// "ruleFiles",
];
