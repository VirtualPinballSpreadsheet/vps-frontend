<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faArrowRightArrowLeft, faLink, faTrashCan } from '@fortawesome/free-solid-svg-icons';
	import { Scraper } from '$lib/stores/ScraperStore';
	import { Edit } from '$lib/stores/EditStore';
	import type { FileUpload, Game } from '$lib/types/VPin';
	import type { PendingSeed } from '$lib/stores/ScraperStore';
	import { sameFirstAuthor, actionDate } from '$lib/helper/scraperUtils';
	import { getUrl } from '$lib/helper/getUrl';
	import { formatDate } from '$lib/helper/formatDate';

	const { pendingSeed } = Scraper;
	const { editStore, saveEdit } = Edit;

	$: seed = $pendingSeed;
	$: cache = $editStore.cache?.data;
	$: seedDate = seed ? actionDate(seed.action) : undefined;
	$: matches = seed && cache ? findMatches(seed, cache) : [];

	function findMatches(seed: PendingSeed, cache: Game): FileUpload[] {
		return sameFirstAuthor(cache, seed.action).filter((f) => f.id !== seed.file.id);
	}

	// merge the source URL into an existing same-author file instead of
	// keeping the seeded new file: drop the seed, patch the target, queue
	const merge = (target: FileUpload, replace: boolean) => {
		if (!$pendingSeed || !cache) return;
		const seed = $pendingSeed;
		const urls = [...(target.urls ?? [])].filter((u) => !u.broken);
		target.urls = replace
			? [{ url: seed.action.detail.normalizedURL }]
			: [...urls, { url: seed.action.detail.normalizedURL }];
		// replacing the URL means the record now points at a different
		// resource: its site date (createdAt) comes from the report
		if (replace && seedDate) target.createdAt = seedDate;
		target.updatedAt = new Date().getTime();

		const files = ((cache[seed.fileType] as FileUpload[] | undefined) ?? []).filter(
			(f) => f.id !== seed.file.id
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(cache as any)[seed.fileType] = files;
		editStore.update((s) => (s.cache ? { ...s, cache: { ...s.cache } } : s));

		saveEdit();
		Scraper.removeAction(seed.action.kind, seed.action);
		Scraper.cancelSeed();
		getToastStore().trigger({
			message: `Queued ${replace ? 'replaced' : 'added'} URL on “${target.version || target.id}”.`
		});
	};

	const dismiss = () => {
		if (!seed) return;
		Scraper.removeAction(seed.action.kind, seed.action);
		Scraper.cancelSeed();
	};
</script>

{#if seed && cache}
	<div class="card p-4 flex flex-col gap-3 variant-soft-primary">
		<div class="flex items-center gap-3 flex-wrap">
			<span class="h5">From scraper report</span>
			<a
				href={seed.action.detail.normalizedURL}
				target="_blank"
				rel="noreferrer"
				class="chip variant-soft-surface gap-2"
			>
				{seed.action.detail.site}
			</a>
			<span class="opacity-60 text-sm">
				{seed.action.detail.author}{#if seedDate} · {formatDate(seedDate)}{/if}
			</span>
			{#if seed.action.message}<span class="opacity-60 text-sm">· {seed.action.message}</span>{/if}
			<div class="flex-1" />
			<button
				class="btn btn-sm variant-ghost-secondary"
				title="Remove from scraper list (file stays in this edit)"
				on:click={dismiss}
			>
				<Fa icon={faTrashCan} size="xs" /> Remove from list
			</button>
		</div>

		{#if seed.action.detail.text}
			<p
				class="text-sm opacity-80 whitespace-pre-line max-h-40 overflow-y-auto rounded bg-surface-700/40 p-2"
			>
				{seed.action.detail.text}
			</p>
		{/if}

		{#if seed.action.detail.images?.length}
			<div class="flex gap-2 flex-wrap">
				{#each seed.action.detail.images as img (img)}
					<a href={img} target="fileImage" rel="noreferrer">
						<img
							src={img}
							alt=""
							loading="lazy"
							class="h-16 w-28 object-cover rounded border border-surface-400/40 hover:opacity-80"
						/>
					</a>
				{/each}
			</div>
		{/if}

		{#if matches.length}
			<div class="flex flex-col gap-2">
				<span class="text-sm opacity-80"
					>{seed.action.detail.author} already has {matches.length} here — merge instead?</span
				>
				{#each matches as file (file.id)}
					<div class="flex items-center gap-2 text-sm">
						<span class="opacity-70 truncate max-w-xs">
							v{file.version || '?'} · {getUrl(file.urls) || file.id}
						</span>
						<div class="flex-1" />
						<button
							class="btn btn-sm variant-soft-primary"
							title="Add this URL to the existing file"
							on:click={() => merge(file, false)}
						>
							<Fa icon={faLink} size="xs" /> Add URL
						</button>
						<button
							class="btn btn-sm variant-soft-secondary"
							title="Replace the existing file's URLs with this one"
							on:click={() => merge(file, true)}
						>
							<Fa icon={faArrowRightArrowLeft} size="xs" /> Replace URL
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
