import { type Database, type Game, type FileUpload, fileTypes } from '$lib/types/VPin';
import type { Mode } from '$lib/types/Filter';

// A "direct" search is one that looks up an exact URL or id instead of doing
// fuzzy text matching. These helpers decide whether a query is a URL or an id
// and, if so, find the matching games/files.

export type DirectResult = Game[] | FileUpload[];

// ---------------------------------------------------------------------------
// Query classification
// ---------------------------------------------------------------------------

// A query is treated as a URL if it contains a scheme ("://") or starts with
// "www.". This covers pasted links like https://vpuniverse.com/files/...
export const isUrlQuery = (q: string): boolean => {
	const t = q.trim().toLowerCase();
	if (!t) return false;
	return t.includes('://') || t.startsWith('www.');
};

// A query is treated as an id if it is a single base64url-ish token of a
// plausible id length. Game and file ids are 8 or 10 chars from the set
// [A-Za-z0-9_-]. We are a little lenient on length so near-misses still get a
// direct lookup (which safely falls back to text search when nothing matches).
export const isIdQuery = (q: string): boolean => {
	const t = q.trim();
	return /^[A-Za-z0-9_-]{6,12}$/.test(t);
};

// ---------------------------------------------------------------------------
// URL matching
// ---------------------------------------------------------------------------

// Normalize a URL so that trivial differences (scheme, www, case, trailing
// slash) don't prevent a match. The query string AND fragment are deliberately
// KEPT: for links like vpforums.org/index.php?showfile=751 the query is the
// actual identifier, and for mega.nz the fragment encodes the file path.
// Stripping either would collapse many distinct files into one. We match
// exactly (no prefix matching) on purpose: the urls in the db are expected to
// be clean, and a junky url that fails to match is a data problem to fix, not
// something to paper over with fuzzy matching.
const normalizeUrl = (u: string): string =>
	u
		.trim()
		.toLowerCase()
		.replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
		.replace(/^www\./, '')
		.replace(/\/+$/, '');

// Two urls match if they are equal after normalization. We intentionally do
// NOT do prefix matching: a short url (a bare host, or a path that many links
// share) would otherwise match a large number of unrelated files.
export const urlsMatch = (query: string, url: string): boolean => {
	const q = normalizeUrl(query);
	const u = normalizeUrl(url);
	return Boolean(q && u && q === u);
};

// Collect every source url associated with a file. FileUpload types carry
// `urls: FileUrl[]`; TutorialFile carries a single `url` and a `youtubeId`.
const fileUrls = (file: any): string[] => {
	const urls: string[] = [];
	if (Array.isArray(file.urls)) {
		for (const u of file.urls) {
			if (u && typeof u.url === 'string') urls.push(u.url);
		}
	}
	if (typeof file.url === 'string') urls.push(file.url);
	if (typeof file.youtubeId === 'string' && file.youtubeId) {
		urls.push(`https://www.youtube.com/watch?v=${file.youtubeId}`);
	}
	return urls;
};

// Find the games/files whose source url matches the query. In game mode the
// parent games are returned; in a file mode only files of that type are.
export const urlLookup = (q: string, db: Database, mode: Mode): DirectResult => {
	const games = new Map<string, Game>();
	const files = new Map<string, FileUpload>();

	for (const game of Object.values(db)) {
		for (const ft of fileTypes) {
			const list = game[ft] as any[] | undefined;
			if (!list) continue;
			for (const file of list) {
				if (!fileUrls(file).some((u) => urlsMatch(q, u))) continue;
				if (mode === 'game') {
					games.set(game.id, game);
				} else if (ft === mode) {
					files.set(file.id, { ...file, game: { id: game.id, name: game.name } });
				}
			}
		}
	}

	return mode === 'game' ? Array.from(games.values()) : Array.from(files.values());
};

// ---------------------------------------------------------------------------
// Id matching
// ---------------------------------------------------------------------------

// Find the game/file with the given id. Returns null when the id matches
// nothing (so the caller can fall back to text search); otherwise returns the
// mode-appropriate result, which may be an empty array (e.g. a game id in a
// file mode where that game has no files of the current type).
export const idLookup = (q: string, db: Database, mode: Mode): DirectResult | null => {
	const qt = q.trim();
	const ql = qt.toLowerCase();

	// 1. game id (exact first, then case-insensitive)
	const game = db[qt] || Object.values(db).find((g) => g.id.toLowerCase() === ql);

	// 2. file id (only scanned when the query is not a game id)
	const matchedFiles: { file: any; game: Game; type: (typeof fileTypes)[number] }[] = [];
	if (!game) {
		for (const g of Object.values(db)) {
			for (const ft of fileTypes) {
				const list = g[ft] as any[] | undefined;
				if (!list) continue;
				for (const f of list) {
					if (f.id && f.id.toLowerCase() === ql) {
						matchedFiles.push({ file: f, game: g, type: ft });
					}
				}
			}
		}
	}

	if (!game && matchedFiles.length === 0) return null;

	if (mode === 'game') {
		const found = new Map<string, Game>();
		if (game) found.set(game.id, game);
		matchedFiles.forEach(({ game: g }) => found.set(g.id, g));
		return Array.from(found.values());
	}

	// file mode
	const res: FileUpload[] = [];
	const seen = new Set<string>();
	if (game) {
		// a game id matched: show all of that game's files of the current type
		((game as any)[mode] as any[])?.forEach((f) => {
			if (!f.id || seen.has(f.id)) return;
			seen.add(f.id);
			res.push({ ...f, game: { id: game.id, name: game.name } });
		});
	}
	matchedFiles.forEach(({ file, game: g, type }) => {
		if (type !== mode || !file.id || seen.has(file.id)) return;
		seen.add(file.id);
		res.push({ ...file, game: { id: g.id, name: g.name } });
	});
	return res;
};
