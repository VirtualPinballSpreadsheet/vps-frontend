<script lang="ts">
	import { Scraper } from '$lib/stores/ScraperStore';
	import type { FileTypeKey } from '$lib/helper/scraperUtils';

	export let fileType: FileTypeKey;
	export let fileId: string;

	const { pendingSeed } = Scraper;

	// the source page's images, shown only in the file a seed was inserted as
	$: images =
		$pendingSeed && $pendingSeed.fileType === fileType && $pendingSeed.file.id === fileId
			? $pendingSeed.action.detail.images ?? []
			: [];
</script>

{#if images.length}
	<div class="flex flex-col gap-2">
		<span class="text-sm opacity-60">
			Site images — click to view full size, then save &amp; upload
		</span>
		<div class="flex gap-2 flex-wrap">
			{#each images as img (img)}
				<a href={img} target="fileImage" rel="noreferrer" title="Open in new tab">
					<img
						src={img}
						alt=""
						loading="lazy"
						class="h-24 w-40 object-cover rounded border border-surface-400/40 hover:opacity-80"
					/>
				</a>
			{/each}
		</div>
	</div>
{/if}
