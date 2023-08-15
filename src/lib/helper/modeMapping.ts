import B2sCard from '$lib/components/cards/B2sCard.svelte';
import FileCard from '$lib/components/cards/FileCard.svelte';
import GameCard from '$lib/components/cards/GameCard.svelte';
import TableCard from '$lib/components/cards/TableCard.svelte';
import type { Mode } from '$lib/types/Filter';

export const modeMapping: {
	[key in Mode]: { route: string; name: string; component: ConstructorOfATypedSvelteComponent };
} = {
	game: { route: 'games', name: 'Games', component: GameCard },
	tableFiles: { route: 'tables', name: 'Tables', component: TableCard },
	b2sFiles: { route: 'b2s', name: 'Backglasses', component: B2sCard },
	pupPackFiles: { route: 'puppacks', name: 'PuP Packs', component: FileCard },
	altColorFiles: { route: 'altcolors', name: 'Alt. Colors', component: FileCard },
	altSoundFiles: { route: 'altsounds', name: 'Alt. Sounds', component: FileCard },
	topperFiles: { route: 'toppers', name: 'Toppers', component: FileCard },
	romFiles: { route: 'roms', name: 'Roms', component: FileCard },
	povFiles: { route: 'pov', name: 'POVs', component: FileCard },
	soundFiles: { route: 'sounds', name: 'Sounds', component: FileCard },
	mediaPackFiles: { route: 'mediapacks', name: 'Media Packs', component: FileCard },
	wheelArtFiles: { route: 'wheelart', name: 'Wheelart', component: FileCard },
	ruleFiles: { route: 'rules', name: 'Rules', component: FileCard }
};
