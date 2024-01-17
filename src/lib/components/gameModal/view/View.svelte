<script lang="ts">
	import { EmptyGame, type Game } from '$lib/types/VPin';
	import HeaderInfo from './HeaderInfo.svelte';
	import Tutorials from './Tutorials.svelte';
	import Backglasses from './Backglasses.svelte';
	import Tables from './Tables.svelte';
	import Header from './Header.svelte';
	import FileList from './FileList.svelte';

	export let game: Game = EmptyGame;
</script>

<Header {game} />
<hr class=" -mx-2 md:-mx-8" />
<Tables tables={game.tableFiles} gameId={game.id} />
<hr class=" -mx-2 md:-mx-8" />
<Backglasses b2ss={game.b2sFiles} gameId={game.id} />
<Tutorials tutorials={game.tutorialFiles} gameId={game.id} />
<FileList files={game.romFiles} gameId={game.id} fileType="romFiles">
	<HeaderInfo title="Roms">
		<div class="w-60">
			<p>Add roms to your rom folder.</p>
			<p class="pre p-2 my-2">C:/PATH_TO_VPX/vpinmame/roms</p>
			<p>Roms are in a zip. Don't unpack them, don't rename them :)</p>
		</div>
	</HeaderInfo>
</FileList>
<FileList files={game.pupPackFiles} title="PuP Packs" gameId={game.id} fileType="pupPackFiles" />
<FileList
	files={game.altColorFiles}
	title="Colored Roms"
	gameId={game.id}
	fileType="altColorFiles"
/>
<FileList files={game.altSoundFiles} title="Alt. Sound" gameId={game.id} fileType="altSoundFiles" />
<FileList files={game.povFiles} gameId={game.id} fileType="povFiles">
	<HeaderInfo title="POV">
		<div class="w-60">
			<p>Open your table in VPX and go to.</p>
			<p class="pre p-2 my-2">File -> Import -> POV</p>
			<p>to import the POV.</p>
		</div>
	</HeaderInfo>
</FileList>
<FileList files={game.wheelArtFiles} title="Wheelart" gameId={game.id} fileType="wheelArtFiles" />
<FileList files={game.topperFiles} title="Topper" gameId={game.id} fileType="topperFiles" />
<FileList
	files={game.mediaPackFiles}
	title="Media Packs"
	gameId={game.id}
	fileType="mediaPackFiles"
/>
<FileList files={game.ruleFiles} title="Rules" gameId={game.id} fileType="ruleFiles" />
