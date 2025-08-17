<script lang="ts">
	import { User } from '$lib/stores/UserStore';
	const { userStore } = User;

	import { faCopy } from '@fortawesome/free-solid-svg-icons';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	const copyBookmarklet = "javascript:(function()%7Bconst%20url%20%3D%20window.location.href%3B%0Aconst%20domain%20%3D%20window.location.hostname%3B%0Aif%20(domain%20%3D%3D%20%22vpuniverse.com%22)%20%7B%0A%09navigator.clipboard.writeText(document.querySelectorAll('script%5Btype%3D%22application%2Fld%2Bjson%22%5D')%5B0%5D.text)%3B%0A%7D%20else%20if%20(domain%20%3D%3D%20%22www.vpforums.org%22)%20%7B%0A%09const%20nav%20%3D%20document.querySelectorAll('span%5Bitemprop%3D%22title%22%5D')%0A%09const%20title%20%3D%20nav%5Bnav.length%20-%201%5D.textContent.split(%22%20(%22)%5B0%5D%3B%0A%09const%20author%20%3D%20document.querySelector(%22.name%22).textContent%3B%09%0A%09const%20dateElements%20%3D%20Array.from(document.querySelectorAll('strong')).filter(el%20%3D%3E%20el.textContent.trim()%20%3D%3D%3D%20'Last%20Updated%3A')%3B%0A%09const%20dateString%20%3D%20dateElements.first()%3F.nextSibling%3F.textContent%3F.trim()%20%7C%7C%20''%3B%0A%09const%20date%20%3D%20Date.parse(dateString)%20%7C%7C%20Date.now()%3B%0A%09const%20titleVersion%20%3D%20document.querySelector('.ipsType_pagetitle').textContent.replace(%22Download%22%2C%20%22%22).trim()%3B%0A%09const%20version%20%3D%20titleVersion.match(%2F%5Cd%2B%5C.%5Cd*%5C.%3F%5Cd*%7C%5Cw%2B%5C.zip%2F)%5B0%5D%3B%0A%09const%20description%20%3D%20document.querySelector('.description_content').textContent.trim()%3B%0A%09const%20content%20%3D%20%7B%22url%22%3A%20url%2C%20%22author%22%3A%7B%22name%22%3Aauthor%7D%2C%22name%22%3Atitle%2C%22description%22%3Adescription%2C%22dateModified%22%3Adate%2C%22softwareVersion%22%3Aversion%7D%3B%0A%09navigator.clipboard.writeText(JSON.stringify(content))%3B%0A%0A%7D%20else%20if%20(domain%20%3D%3D%20%22youtube.com%22%20%7C%7C%20domain%20%3D%3D%20%22www.youtube.com%22)%20%7B%0A%09const%20id%20%3D%20new%20URLSearchParams(window.location.search).get(%22v%22)%3B%0A%09const%20title%20%3D%20document.querySelector(%22%23title%22).textContent.trim()%3B%0A%09const%20author%20%3D%20document.querySelector(%22%23text-container%22).textContent.trim()%3B%0A%09const%20content%20%3D%20%7B%22url%22%3A%20url%2C%20%22author%22%3A%7B%22name%22%3Aauthor%7D%2C%22name%22%3Atitle%2C%22youtubeId%22%3Aid%7D%3B%0A%09navigator.clipboard.writeText(JSON.stringify(content))%3B%0A%7D%7D)()%3B";
</script>

<div class="flex flex-col gap-4">

	{#if $userStore.admin}
	<div class="text-4xl font-bold">Admin Tools - Cut & Paste</div>

	<p>To gather information from VPU, VPF and YouTube you need to create a bookmarklet --
		a bookmark that executes javascript rather than goes to a url.
	</p>

	<p>
		1. Click this button to copy the javascript:
		<button
			class="chip badge-glass py-0.5 px-1 cursor-pointer"
			use:clipboard={copyBookmarklet}
		>
			COPY Bookmarklet
			<Fa icon={faCopy} size="8" class="ml-2" />
		</button>
	</p>
	<p>2. Go to the bookmark manager.</p>
	<p>3. Create a new bookmark and name it something like "COPY".</p>
	<p>4. Paste the javascript (copied above) as the url.</p>

	<p>
		Now when you go to a table (etc.) page on VPU, VPF or YouTube you can click
		that bookmark to copy the information from the page.  On the Game edit page you
		can click the "New from paste" button to create a new entry.
	</p>

	<p>
		Additionally you can do the following:
	</p>
	<p>&bull; copy a Game id and "New from paste" to copy the roms from another Game</p>
	<p>&bull; copy a Table (File) id and paste into Comments</p>
	<p>&bull; copy a Table (File) id and paste into Features</p>
	<p>&bull; copy a Table (File) id and paste into Authors</p>
	<p>&bull; copy from VPU/VPF and paste into Version to set the version and date</p>

	{/if}

	<div class="text-4xl font-bold">About VPS</div>
	<p>VPS is community maintained database for Virtual Pinball related files and infos.</p>
	<p>
		Through the site you can search new & old releases of pinball tables and additional files you
		might need to run them.
	</p>
	<p>
		VPS does NOT distribute any files itself. It is only a collection of what is out there and where
		to find it.
	</p>
	<h1 class="text-4xl font-bold pt-8">Search</h1>
	<p>
		Use the search to find stuff! On the right side of the searchbar, you can change what type of
		file you are looking for.
	</p>
	<h1 class="text-xl font-bold pt-4">Filter</h1>
	<p>
		Click the filter icon to the right of the search box to open the filter section. The filter
		allows you to refine your search and restrict it to certain types of features, creators,
		manufacturers or themes.
	</p>
	<h1 class="text-4xl font-bold pt-8">Tools</h1>
	<h1 class="text-xl font-bold">CSV Export</h1>

	<p>
		On the top right in the "Tools" menu, you will find the CSV export. Here you can generate CSV
		files for both Popper and PinballX.
	</p>
	<p>
		The export is based on your current search and filter input! If you f.ex. want to export a CSV
		file that only contains VR tables, set the filter to VR and export. You should see it change in
		the preview as you go.
	</p>
	<p>The "Format Name" options let you adjust the generated tablesnames to a desired format.</p>
	<h1 class="text-xl font-bold pt-4">Bookmarks</h1>
	<p>
		Maybe you are setting up a new library and want to browse through all of VPS. Maybe you want to
		remember a couple of files to download them later. That is what bookmarks are for.
	</p>
	<p>
		You can right click on any type of file and add it to your bookmarks. They will be saved in your
		local browser and persist throughout sessions. If you wanna work through a list, you can also
		check them off to keep track.
	</p>
	<h1 class="text-4xl font-bold pt-8">API</h1>
	<p>
		VPS is open source and hosted completely on github. Our "database" consists of one json file
		that is exposed publicly. Images are hosted on github aswell and exposed to the public. The URLs
		to the respective images is listed in the database json.
	</p>
	<p>If you want to use the database in your own application you can fetch it through this url:</p>
	<code>https://virtualpinballspreadsheet.github.io/vps-db/db/vpsdb.json</code>
	<p>
		The database is rebuilt regulary on every change. If you want to save on excess calls you can
		fetch this file first to get the timestamp of the latest release:
	</p>
	<code>https://virtualpinballspreadsheet.github.io/vps-db/lastUpdated.json</code>
	<p>If your version is outdated, you might fetch the latest.</p>
	<p>
		With every update, a full new pupLookup.csv is generated aswell in case you want to update yours
		on a regular basis.
	</p>
	<code>https://virtualpinballspreadsheet.github.io/vps-db/db/puplookup.csv</code>
	<h1 class="text-4xl font-bold pt-8">Contact</h1>
	<p>
		You can find us in <a
			class="text-primary-400 font-bold"
			href="https://discord.gg/virtual-pinball-chat-652274650524418078">Discord</a
		>
		in the VPS channel or on
		<a class="text-primary-400 font-bold" href="https://www.facebook.com/VPSheet">Facebook</a>. Feel
		free to contact us if you have troubles or an idea!
	</p>
	<h1 class="text-4xl font-bold pt-8">Contribute</h1>
	<p>
		If you want to contribute to either the content of the site or actual coding, feel free to
		contact us on discord in the VPS thread!
	</p>
	<a class="text-primary-400 font-bold" href="https://discord.gg/WRhR5v59"
		>Join the Virtual Pinball Chat!</a
	>
	<p>We appreciate every little help we can get!</p>
	<h1 class="text-xl font-bold pt-4">Software architecture</h1>
	<p>
		The site is written in svelte and hosted on github pages. The "backend" is one big json file
		that is generated via a github action.
	</p>
	<code>https://github.com/VirtualPinballSpreadsheet/vps-frontend</code>
	<code>https://github.com/VirtualPinballSpreadsheet/vps-db</code>
	<p>
		The goal for this architecture was to be completely free and untied to anybody in particular. We
		might not be around forever in the scene and it would be shame to let the project die because
		one of us could not maintain it anymore (as seen before in the VPin scene...). This software
		stack runs completely free and is completely transferable, no personal accounts or credit cards
		involved. There were lots of challanges that could have been prevented easily with a proper
		backend. This way though the site can continue to run until github closes its doors.
	</p>
</div>
