import { type Game, fileTypes, type FileUpload } from '$lib/types/VPin';
import MiniSearch from 'minisearch';
import { derived, get, writable, type Writable } from 'svelte/store';
import { DB } from './DbStore';
import type { SortBy, Mode } from '$lib/types/Filter';

// -------- STORES -----------------------------------------------------------------------

const sortedDbStore = derived(DB.dbStore, ($db) => {
	return Object.values($db).sort((a, b) => {
		return b.updatedAt - a.updatedAt;
	});
});

const sortedFilesStore = derived(DB.dbStore, ($db) => {
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
				res[fileType] = (res[fileType] || []).concat(
					files.map((f) => ({
						...f,
						game: {
							id: game.id,
							name: game.name
						}
					}))
				);
			}
		}
	}

	// Sort all
	Object.entries(res).forEach(([key, val]) => {
		//@ts-ignore
		res[key] = val.sort((a, b) => {
			return (b.createdAt || 0) - (a.createdAt || 0);
		});
	});

	return res;
});

const query = writable<string>('');
const mode = writable<Mode>('game');
const players = writable<{ value: [number, number]; active: boolean }>({
	active: false,
	value: [0, 10]
});
const manufacturer = writable<{ value: string[]; active: boolean }>({ active: false, value: [] });
const sortBy = writable<SortBy>('lastUpdated');

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
	[debouncedQuery, players, manufacturer],
	([q, players, manufacturer]) => {
		return q || players.active || manufacturer.active;
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

// // SearchReults mapped to games
// const gameSearchResultsStore = derived(
// 	[minisearchResultsStore, sortedDbStore],
// 	([$sr, $db]) => {
// 		if (!$sr)  return $db;
// 	return $sr.map((r) => $db[r.id]);
// 	}
// );

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
				if (!file.authors.some((author) => author.includes(q))) return;
				res.push({ ...file, game: { id: game.id, name: game.name } });
			});
		}
		return res;
	}
);

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

const playerFilterStore = derived([players, modeSearchResults], ([$filter, $db]) => {
	if (!$filter.active || !$db?.length) return $db;
	return genericFilter($db, (game) =>
		Boolean(
			game.players !== undefined &&
				game.players >= $filter.value[0] &&
				game.players <= $filter.value[1]
		)
	);
});
const manufacturerFilterStore = derived([manufacturer, playerFilterStore], ([$filter, $db]) => {
	if (!$filter.active || !$db?.length) return $db;
	return genericFilter($db, (game) => $filter.value.includes(game.manufacturer));
});

const finalResultsStore = manufacturerFilterStore;

// const searchResultsStore = derived(
// 	[searchOptionsStore, sortedFilesStore, minisearchResultsStore],
// 	([$so, $sf, $db]) => {
// 		const { mode, filterState, filterValues, sortBy } = $so;
// 		const {} = $sf;

// 		const data = getSearchResultsForMode(mode, $db )
// 	}
// );

export const Search = {
	sortedDbStore,
	sortedFilesStore,
	finalResultsStore,
	query,
	mode,
	players,
	manufacturer,
	sortBy,
	isSearchActive
};
