import { describe, it, expect } from 'vitest';
import {
	isUrlQuery,
	isIdQuery,
	urlsMatch,
	urlLookup,
	idLookup,
	type DirectResult
} from './directSearch';
import type { Database, Game, FileUpload, TableFile, RomFile } from '$lib/types/VPin';

// ---------------------------------------------------------------------------
// Fixture
//
// A small, controlled database. We deliberately do NOT load the real vpsdb.json
// (it lives in the sibling vps-db repo and is huge): a fixture keeps the tests
// fast, deterministic, and independent of external data. It still exercises the
// interesting cases — query-string ids (vpforums), path ids (vpuniverse), and
// fragment ids (mega.nz) — across multiple games and file types.
// ---------------------------------------------------------------------------

const table = (id: string, url: string): TableFile => ({
	id,
	authors: ['author'],
	updatedAt: 1,
	tableFormat: 'VPX',
	urls: [{ url }]
});

const rom = (id: string, url: string): RomFile => ({
	id,
	authors: ['author'],
	updatedAt: 1,
	urls: [{ url }]
});

const game = (id: string, name: string, extra: Partial<Game> = {}): Game => ({
	id,
	name,
	year: 1999,
	manufacturer: 'TestCo',
	updatedAt: 1,
	...extra
});

const db: Database = {
	// Has a table (vpforums query-string id) AND a rom (a different vpforums id).
	game0001: game('game0001', "Sharkey's Shootout", {
		tableFiles: [
			table('table001', 'https://www.vpforums.org/index.php?app=downloads&showfile=17584')
		],
		romFiles: [rom('rom00001', 'https://vpforums.org/index.php?app=downloads&showfile=1105')]
	}),
	// Has a table with a path-based id (vpuniverse).
	game0002: game('game0002', 'Wild Card', {
		tableFiles: [
			table(
				'table002',
				'https://vpuniverse.com/files/file/15258-wild-card-williams-1977_teisen_mod/'
			)
		]
	}),
	// Has a table whose mega.nz fragment is the identifier.
	game0003: game('game0003', 'Mega Game', {
		tableFiles: [table('table003', 'https://mega.nz/?fbclid=abc#f!e6ac2byl!jv2_vxz')]
	})
};

// Both Game and FileUpload carry an `id`, so one helper covers both result kinds.
const ids = (r: DirectResult | null): string[] => (r as (Game | FileUpload)[]).map((x) => x.id);

// ---------------------------------------------------------------------------
// Query classification
// ---------------------------------------------------------------------------

describe('isUrlQuery', () => {
	it('detects scheme-prefixed urls', () => {
		expect(isUrlQuery('https://vpuniverse.com/files/file/123/')).toBe(true);
		expect(isUrlQuery('http://example.com/a')).toBe(true);
	});
	it('detects www-prefixed urls', () => {
		expect(isUrlQuery('www.vpforums.org/index.php?showfile=751')).toBe(true);
	});
	it('rejects plain text and empty input', () => {
		expect(isUrlQuery('sharkey')).toBe(false);
		expect(isUrlQuery('')).toBe(false);
		expect(isUrlQuery('   ')).toBe(false);
	});
});

describe('isIdQuery', () => {
	it('accepts plausible id tokens (6-12 chars, base64url-ish)', () => {
		expect(isIdQuery('usxwtR0Y')).toBe(true); // 8
		expect(isIdQuery('abc123')).toBe(true); // 6 (min)
		expect(isIdQuery('aB3_-xyz90')).toBe(true); // 10
	});
	it('rejects too-short, too-long, or non-id tokens', () => {
		expect(isIdQuery('abc')).toBe(false); // 5 (too short)
		expect(isIdQuery('a-very-long-id-over-twelve')).toBe(false); // too long
		expect(isIdQuery('has space')).toBe(false); // space not in the set
		expect(isUrlQuery('https://x.com/a') && isIdQuery('https://x.com/a')).toBe(false); // not a single token
	});
});

// ---------------------------------------------------------------------------
// URL matching
// ---------------------------------------------------------------------------

describe('urlsMatch', () => {
	it('ignores scheme, www, case, and trailing slash', () => {
		expect(urlsMatch('HTTPS://WWW.EXAMPLE.COM/A/', 'https://example.com/a')).toBe(true);
	});
	it('treats the query string as significant', () => {
		expect(
			urlsMatch(
				'https://vpforums.org/index.php',
				'https://vpforums.org/index.php?app=downloads&showfile=751'
			)
		).toBe(false);
	});
	it('treats the fragment as significant', () => {
		expect(urlsMatch('https://mega.nz/?x=1#f!aaa!bbb', 'https://mega.nz/?x=1#f!ccc!ddd')).toBe(
			false
		);
	});
	it('does not prefix-match', () => {
		expect(urlsMatch('https://example.com/a', 'https://example.com/a/b')).toBe(false);
	});
});

// ---------------------------------------------------------------------------
// urlLookup
// ---------------------------------------------------------------------------

describe('urlLookup', () => {
	it('game mode: a rom-only url returns its game (searches ALL file types)', () => {
		const r = urlLookup('https://vpforums.org/index.php?app=downloads&showfile=1105', db, 'game');
		expect(ids(r)).toEqual(['game0001']);
	});
	it('game mode: a table url returns its game', () => {
		const r = urlLookup(
			'https://www.vpforums.org/index.php?app=downloads&showfile=17584',
			db,
			'game'
		);
		expect(ids(r)).toEqual(['game0001']);
	});
	it('file mode: a rom-only url returns empty in tables mode (that type only)', () => {
		const r = urlLookup(
			'https://vpforums.org/index.php?app=downloads&showfile=1105',
			db,
			'tableFiles'
		);
		expect(ids(r)).toEqual([]);
	});
	it('file mode: a rom url returns that rom in roms mode', () => {
		const r = urlLookup(
			'https://vpforums.org/index.php?app=downloads&showfile=1105',
			db,
			'romFiles'
		);
		expect(ids(r)).toEqual(['rom00001']);
	});
	it('file mode: a table url returns that table in tables mode', () => {
		const r = urlLookup(
			'https://vpuniverse.com/files/file/15258-wild-card-williams-1977_teisen_mod/',
			db,
			'tableFiles'
		);
		expect(ids(r)).toEqual(['table002']);
	});
	it('a specific mega.nz url returns only its game (no flood)', () => {
		const r = urlLookup('https://mega.nz/?fbclid=abc#f!e6ac2byl!jv2_vxz', db, 'game');
		expect(ids(r)).toEqual(['game0003']);
	});
	it('returns empty when nothing matches', () => {
		expect(ids(urlLookup('https://example.com/notthere', db, 'game'))).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// idLookup
// ---------------------------------------------------------------------------

describe('idLookup', () => {
	it('a game id in game mode returns that game', () => {
		expect(ids(idLookup('game0001', db, 'game'))).toEqual(['game0001']);
	});
	it('a game id is case-insensitive', () => {
		expect(ids(idLookup('GAME0001', db, 'game'))).toEqual(['game0001']);
	});
	it("a game id in a file mode returns all of that game's files of the type", () => {
		expect(ids(idLookup('game0001', db, 'romFiles'))).toEqual(['rom00001']);
	});
	it('a game id in a file mode with no files of that type returns an empty array (not null)', () => {
		const r = idLookup('game0002', db, 'romFiles');
		expect(r).not.toBeNull();
		expect(ids(r)).toEqual([]);
	});
	it("a file id in game mode returns the file's parent game", () => {
		expect(ids(idLookup('rom00001', db, 'game'))).toEqual(['game0001']);
	});
	it('a file id in its own type mode returns that file', () => {
		expect(ids(idLookup('rom00001', db, 'romFiles'))).toEqual(['rom00001']);
	});
	it('a file id in a different type mode returns empty', () => {
		expect(ids(idLookup('rom00001', db, 'tableFiles'))).toEqual([]);
	});
	it('an unknown id returns null (so the caller falls back to text search)', () => {
		expect(idLookup('zzzzzz', db, 'game')).toBeNull();
	});
});
