<script lang="ts">
	import { EmptyGame, type Game } from '$lib/types/VPin';
	import HeaderInfo from '../../HeaderInfo.svelte';
	import Backglasses from './Backglasses.svelte';
	import Tables from './Tables.svelte';
	import Header from './Header.svelte';
	import FileList from './FileList.svelte';

	export let game: Game = EmptyGame;
	export let onEdit = () => {};
</script>

<Header {game} {onEdit} />
<hr class=" -mx-2 md:-mx-8" />

<Tables tables={game.tableFiles} />
<hr class=" -mx-2 md:-mx-8" />
<Backglasses b2ss={game.b2sFiles} />
<FileList files={game.romFiles}>
	<HeaderInfo title="Roms">
		<div class="w-60">
			<p>Add roms to your rom folder.</p>
			<p class="pre p-2 my-2">C:/PATH_TO_VPX/vpinmame/roms</p>
			<p>Roms are in a zip. Don't unpack them, don't rename them :)</p>
		</div>
	</HeaderInfo>
</FileList>
<FileList files={game.pupPackFiles} title="PuP Packs" />
<FileList files={game.altColorFiles} title="Alt. Color" />
<FileList files={game.altSoundFiles} title="Alt. Sound" />
<FileList files={game.povFiles}>
	<HeaderInfo title="POV">
		<div class="w-60">
			<p>Open your table in VPX and go to.</p>
			<p class="pre p-2 my-2">File -> Import -> POV</p>
			<p>to import the POV.</p>
		</div>
	</HeaderInfo>
</FileList>
<FileList files={game.wheelArtFiles} title="Wheelart" />
<FileList files={game.topperFiles} title="Topper" />
<FileList files={game.mediaPackFiles} title="Media Packs" />
