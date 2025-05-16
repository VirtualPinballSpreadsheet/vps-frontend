import { type Game, fileTypes, type FileUpload, type TableFile, EmptyGame } from '$lib/types/VPin';
import MiniSearch from 'minisearch';
import { derived, get, writable, type Writable } from 'svelte/store';
import { DB } from './DbStore';
import type { SortBy, Mode } from '$lib/types/Filter';
import { sortOptions } from '$lib/types/Filter';

// -------- STORES -----------------------------------------------------------------------

const sortBy = writable<SortBy>('lastUpdated');

const sortedDbStore = derived([DB.dbStore, sortBy], ([$db, sortBy]) => {
	const sortOption = sortOptions.find(element => element.sortBy == sortBy) || sortOptions[0];
	return Object.values($db).sort(sortOption.compareGames);
});

const sortedFilesStore = derived([DB.dbStore, sortBy], ([$db, sortBy]) => {
	const sortOption = sortOptions.find(element => element.sortBy == sortBy) || sortOptions[0];
	const games = Object.values($db);
	const res: { [K in (typeof fileTypes)[number]]?: FileUpload[] } = {};
	for (const fileType of fileTypes) {
		res[fileType] = [];
	}

	// Append all filetypes separately
	for (const game of games) {
		for (const fileType of fileTypes) {
			const files = game[fileType];
			if (Array.isArray(files)) {
				files.forEach((f) => {
					//@ts-ignore
					f.game = {
						id: game.id,
						name: game.name
					};
				});
				//@ts-ignore
				res[fileType].push(
					//@ts-ignore
					...files
				);
			}
		}
	}

	// Sort all
	Object.entries(res).forEach(([key, val]) => {
		//@ts-ignore
		res[key] = val.sort((a, b) => {
			//@ts-ignore
			const ag = $db[a.game.id] || EmptyGame;
			//@ts-ignore
			const bg = $db[b.game.id] || EmptyGame;
			return sortOption.compareFiles(a, ag, b, bg);
		});
	});

	return res;
});

const query = writable<string>('');
const mode = writable<Mode>('game');

// FILTERS
const filterActive = writable(false);

const players = writable<{ value: [number, number]; active: boolean }>({
	active: false,
	value: [0, 10]
});
const manufacturer = writable<{
	value: string[];
	active: boolean;
	options: { label: string; value: string }[];
}>({ active: false, value: [], options: [] });
const features = writable<{
	value: string[];
	active: boolean;
	options: { label: string; value: string }[];
}>({ active: false, value: [], options: [] });
const theme = writable<{
	value: string[];
	active: boolean;
	options: { label: string; value: string }[];
}>({ active: false, value: [], options: [] });
const author = writable<{
	value: string[];
	active: boolean;
	options: { label: string; value: string }[];
}>({ active: false, value: [], options: [] });
const designers = writable<{
	value: string[];
	active: boolean;
	options: { label: string; value: string }[];
}>({ active: false, value: [], options: [] });

let timeoutId: NodeJS.Timeout;

const debouncedQuery = derived<Writable<string>, string>(query, ($q, set) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		return set($q);
	}, 300);
});

const isSearchActive = derived(
	[debouncedQuery, players, manufacturer, features, author, theme, filterActive],
	([q, players, manufacturer, features, theme, author, filterActive]) => {
		return (
			q ||
			(filterActive &&
				(players.active || manufacturer.active || features.active || theme.active || author.active))
		);
	}
);

// -------- MINISEARCH -----------------------------------------------------------------------
const minisearch = new MiniSearch<Game>({
	fields: ['name', 'manufacturer', 'designers', ...fileTypes],
	extractField: (document: any, fieldName) => {
		//@ts-ignore
		if (fileTypes.includes(fieldName)) {
			const vals = document[fieldName]?.reduce(
				(a: any, b: any) => [...a, ...(b.authors || [])],
				[]
			);
			return vals?.join(', ') || '';
		}
		if (Array.isArray(document[fieldName])) return document[fieldName].join(', ');
		// Access nested fields
		return document[fieldName];
	}
});

sortedDbStore.subscribe(($db) => {
	minisearch.removeAll();
	minisearch.addAll(Object.values($db));
	let _features: string[] = [];
	let _theme: string[] = [];
	let _designers: string[] = [];
	let _manufacturer: string[] = [];
	let _authors: string[] = [];
	const year: [number, number] = [9999, 0];

	let time = performance.now();

	$db.forEach((t) => {
		if (t.designers) _designers.push(...t.designers);
		if (t.theme) _theme.push(...t.theme);
		if (t.manufacturer) _manufacturer.push(t.manufacturer);
		t.year < year[0] && (year[0] = t.year);
		t.year > year[1] && (year[1] = t.year);
		fileTypes.forEach((ft) => {
			t[ft]?.forEach((file) => {
				if (file.authors) _authors.push(...file.authors);
				if (file.features) _features.push(...file.features);
				if (file.tableFormat) _features.push(file.tableFormat);
			});
		});
	});

	features.update((state) => ({
		...state,
		options: Array.from(new Set(_features))
			.sort((a, b) => (a.trim() > b.trim() ? 1 : -1))
			.map((value) => ({ label: value, value }))
	}));
	theme.update((state) => ({
		...state,
		options: Array.from(new Set(_theme))
			.sort((a, b) => (a.trim() > b.trim() ? 1 : -1))
			.map((value) => ({ label: value, value }))
	}));
	manufacturer.update((state) => ({
		...state,
		options: Array.from(new Set(_manufacturer))
			.sort((a, b) => (a.trim() > b.trim() ? 1 : -1))
			.map((value) => ({ label: value, value }))
	}));
	designers.update((state) => ({
		...state,
		options: Array.from(new Set(_designers))
			.sort((a, b) => (a.trim() > b.trim() ? 1 : -1))
			.map((value) => ({ label: value, value }))
	}));
	author.update((state) => ({
		...state,
		options: Array.from(new Set(_authors))
			.sort((a, b) => (a.trim() > b.trim() ? 1 : -1))
			.map((value) => ({ label: value, value }))
	}));

	console.log('Assemble autocomplete', performance.now() - time);
});

// Search results
const minisearchResultsStore = derived([debouncedQuery, sortedDbStore], ([$q, $db]) => {
	if (!$q) return;
	const res = minisearch.search($q.toLowerCase(), {
		prefix: true,
		fuzzy: 0.2,
		combineWith: 'AND'
	});
	return res;
});

// Searchresults mapped by mode to objects
const modeSearchResults = derived(
	[mode, minisearchResultsStore, sortedDbStore, sortedFilesStore],
	([$mode, $sr, $db, $fdb]) => {
		if (!$sr) {
			// No Searchresult, return sorted dbs
			if ($mode === 'game') return $db;
			return $fdb[$mode] || [];
		}

		const $fullDb = get(DB.dbStore);

		if ($mode === 'game') {
			return $sr.map((r) => $fullDb[r.id]);
		}

		// Filter so that only valid entries are shown
		const valid = ['name', 'manufacturer', 'designers', $mode];
		const validGame = ['name', 'manufacturer', 'designers'];
		const filteredSr = $sr.filter((sr) =>
			Object.values(sr.match).some((els) => els.some((el) => valid.includes(el)))
		);
		const res: FileUpload[] = [];
		for (const sr of filteredSr) {
			const game = $fullDb[sr.id];
			const files = game?.[$mode];
			if (!files?.length) continue;
			// If game query matches, push all
			if (Object.values(sr.match).some((els) => els.some((el) => validGame.includes(el)))) {
				res.push(...files.map((f) => ({ ...f, game: { id: game.id, name: game.name } })));
				continue;
			}
			const q = Object.entries(sr.match).find(([q, els]) => els.some((el) => el === $mode))?.[0];
			if (!q) continue;
			// .. otherwise theres only author to match
			files.forEach((file) => {
				if (!file.authors?.some((author) => author.includes(q))) return;
				res.push({ ...file, game: { id: game.id, name: game.name } });
			});
		}
		return res;
	}
);

const resetFilters = () => {
	query.set('');
	filterActive.set(false);
};

// FILTERS
const genericFilter = (arr: FileUpload[] | Game[], filter: (game: Game) => boolean) => {
	if ((arr[0] as FileUpload).game) {
		// FileMode
		const $fullDb = get(DB.dbStore);
		return (arr as FileUpload[]).filter((file) => {
			if (!file.game?.id) return;
			const game = $fullDb[file.game.id];
			if (!game) return;
			return filter(game);
		});
	} else {
		// GameMode
		return (arr as Game[]).filter(filter);
	}
};

const playerFilterStore = derived(
	[filterActive, players, modeSearchResults],
	([$filterActive, $filter, $db]) => {
		if (!$filterActive || !$filter.active || !$db?.length || !$filter.value.length) return $db;
		return genericFilter($db, (game) =>
			Boolean(
				game.players !== undefined &&
					game.players >= $filter.value[0] &&
					game.players <= $filter.value[1]
			)
		);
	}
);

const manufacturerFilterStore = derived(
	[filterActive, manufacturer, playerFilterStore],
	([$filterActive, $filter, $db]) => {
		console.log($filter);
		if (!$filterActive || !$filter.active || !$db?.length || !$filter.value.length) return $db;
		return genericFilter($db, (game) => $filter.value.includes(game.manufacturer));
	}
);

const themeFilterStore = derived(
	[filterActive, theme, manufacturerFilterStore],
	([$filterActive, $filter, $db]) => {
		if (!$filterActive || !$filter.active || !$db?.length) return $db;
		return genericFilter($db, (game) =>
			$filter.value.every((theme) => game.theme?.includes(theme))
		);
	}
);
const authorFilterStore = derived(
	[filterActive, author, themeFilterStore],
	([$filterActive, $filter, $db]) => {
		if (!$filterActive || !$filter.active || !$db?.length || !$filter.value.length) return $db;
		return $db.filter((item: any) => {
			if ((item as FileUpload).game) {
				// FileMode
				return $filter.value.every((a) => (item as FileUpload).authors?.includes(a));
			} else {
				return (item as Game).tableFiles?.some((t) =>
					$filter.value.every((a) => t.authors?.includes(a))
				);
			}
		});
	}
);
const featureFilterStore = derived(
	[filterActive, features, authorFilterStore],
	([$filterActive, $filter, $db]) => {
		if (!$filterActive || !$filter.active || !$db?.length || !$filter.value.length) return $db;

		return $db.filter((item: any) => {
			if ((item as FileUpload).game) {
				// FileMode
				return $filter.value.every(
					(f) => (item as TableFile).features?.includes(f) || item.tableFormat === f
				);
			} else {
				return (item as Game).tableFiles?.some((t) =>
					$filter.value.every(
						(f) => (t.features?.includes(f) || t.tableFormat == f)
					)
				);
			}
		});
	}
);

const finalResultsStore = featureFilterStore;

export const Search = {
	resetFilters,
	sortedDbStore,
	sortedFilesStore,
	finalResultsStore,
	query,
	mode,
	// FILTER
	filterActive,
	players,
	manufacturer,
	theme,
	author,
	designers,
	features,
	sortBy,
	isSearchActive
};
