import B2sCard from '$lib/components/cards/B2sCard.svelte';
import FileCard from '$lib/components/cards/FileCard.svelte';
import GameCard from '$lib/components/cards/GameCard.svelte';
import TableCard from '$lib/components/cards/TableCard.svelte';
import TutorialCardSmall from '$lib/components/cards/TutorialCardSmall.svelte';
import type { Mode } from '$lib/types/Filter';
import {
	faBox,
	faBrush,
	faCamera,
	faCircle,
	faFile,
	faFilm,
	faImage,
	faMusic,
	faSave,
	faVolumeControlPhone,
	type IconDefinition
} from '@fortawesome/free-solid-svg-icons';

export const modeMapping: {
	[key in Mode]: {
		route: string;
		name: string;
		component: ConstructorOfATypedSvelteComponent;
		icon?: IconDefinition;
	};
} = {
	game: { route: 'games', name: 'Games', component: GameCard },
	tableFiles: { route: 'tables', name: 'Tables', component: TableCard },
	b2sFiles: { route: 'b2s', name: 'Backglasses', component: B2sCard },
	pupPackFiles: { route: 'puppacks', name: 'PuP Packs', component: FileCard, icon: faFilm },
	altColorFiles: { route: 'coloredroms', name: 'Colored Roms', component: FileCard, icon: faBrush },
	altSoundFiles: { route: 'altsounds', name: 'Alt. Sounds', component: FileCard, icon: faMusic },
	topperFiles: { route: 'toppers', name: 'Toppers', component: FileCard, icon: faBox },
	romFiles: { route: 'roms', name: 'Roms', component: FileCard, icon: faSave },
	povFiles: { route: 'pov', name: 'POVs', component: FileCard, icon: faCamera },
	soundFiles: { route: 'sounds', name: 'Sounds', component: FileCard, icon: faVolumeControlPhone },
	mediaPackFiles: { route: 'mediapacks', name: 'Media Packs', component: FileCard, icon: faImage },
	wheelArtFiles: { route: 'wheelart', name: 'Wheelart', component: FileCard, icon: faCircle },
	ruleFiles: { route: 'rules', name: 'Rules', component: FileCard, icon: faFile },
	tutorialFiles: {
		route: 'tutorials',
		name: 'Tutorials',
		component: TutorialCardSmall,
		icon: faFile
	}
};
