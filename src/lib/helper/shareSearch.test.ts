import { describe, it, expect } from 'vitest';
import {
	shareStateToParams,
	paramsToShareState,
	buildShareUrl,
	type ShareState
} from './shareSearch';

// A ShareState with everything inactive/empty; tests override what they need.
const base = (over: Partial<ShareState> = {}): ShareState => ({
	query: '',
	mode: 'game',
	sortBy: 'lastUpdated',
	year: null,
	players: null,
	manufacturer: null,
	features: null,
	theme: null,
	author: null,
	designers: null,
	...over
});

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

describe('shareStateToParams', () => {
	it('omits everything for an empty state', () => {
		expect(shareStateToParams(base()).toString()).toBe('');
	});
	it('encodes the query and omits the default sort', () => {
		// 'search' is the default sort when a query is present
		const p = shareStateToParams(base({ query: 'sharkey', sortBy: 'search' }));
		expect(p.get('query')).toBe('sharkey');
		expect(p.get('sort')).toBeNull();
	});
	it('encodes a non-default sort', () => {
		expect(shareStateToParams(base({ sortBy: 'nameDSC' })).get('sort')).toBe('nameDSC');
	});
	it('encodes active filters only', () => {
		const p = shareStateToParams(
			base({
				year: [1990, 2000],
				players: [1, 2],
				manufacturer: ['Bally', 'Williams'],
				author: ['Teisen']
			})
		);
		expect(p.get('year')).toBe('1990-2000');
		expect(p.get('players')).toBe('1-2');
		expect(p.get('manufacturer')).toBe('Bally,Williams');
		expect(p.get('author')).toBe('Teisen');
		expect(p.get('theme')).toBeNull();
		expect(p.get('features')).toBeNull();
		expect(p.get('designers')).toBeNull();
	});
});

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

describe('paramsToShareState', () => {
	it('returns null for empty params', () => {
		expect(paramsToShareState(new URLSearchParams(), 'game')).toBeNull();
	});
	it('returns null for non-share params (modal links)', () => {
		expect(paramsToShareState(new URLSearchParams('game=abc123&fileId=x'), 'game')).toBeNull();
	});
	it('parses a full share link', () => {
		const s = paramsToShareState(
			new URLSearchParams(
				'query=sharkey&sort=nameDSC&year=1990-2000&manufacturer=Bally,Williams&author=Teisen'
			),
			'tableFiles'
		);
		expect(s).toEqual({
			query: 'sharkey',
			mode: 'tableFiles',
			sortBy: 'nameDSC',
			year: [1990, 2000],
			players: null,
			manufacturer: ['Bally', 'Williams'],
			features: null,
			theme: null,
			author: ['Teisen'],
			designers: null
		});
	});
	it('falls back to the default sort for an invalid sort value', () => {
		const s = paramsToShareState(new URLSearchParams('query=x&sort=bogus'), 'game');
		expect(s?.sortBy).toBe('search');
	});
	it('omits the sort param entirely -> default for the query state', () => {
		expect(paramsToShareState(new URLSearchParams('query=x'), 'game')?.sortBy).toBe('search');
		expect(paramsToShareState(new URLSearchParams('year=1990-2000'), 'game')?.sortBy).toBe(
			'lastUpdated'
		);
	});
	it('ignores invalid ranges', () => {
		expect(paramsToShareState(new URLSearchParams('year=abc'), 'game')?.year).toBeNull();
	});
	it('trims and drops empty list items', () => {
		expect(
			paramsToShareState(new URLSearchParams('manufacturer=Bally,,Williams,'), 'game')?.manufacturer
		).toEqual(['Bally', 'Williams']);
	});
});

// ---------------------------------------------------------------------------
// Round trip
// ---------------------------------------------------------------------------

describe('round trip', () => {
	it('state -> params -> state is the identity', () => {
		const s = base({
			query: "Sharkey's Shootout",
			mode: 'romFiles',
			sortBy: 'yearASC',
			year: [1977, 1999],
			players: [1, 2],
			manufacturer: ['Bally', 'Williams'],
			features: ['MOD', 'FastFlips'],
			theme: ['Sci-Fi'],
			author: ['Teisen', 'Jubilee'],
			designers: ['John Datko']
		});
		expect(paramsToShareState(shareStateToParams(s), s.mode)).toEqual(s);
	});
	it('a url query (direct search) survives the round trip', () => {
		const s = base({
			query: 'https://vpforums.org/index.php?app=downloads&showfile=751',
			mode: 'tableFiles',
			sortBy: 'search'
		});
		expect(paramsToShareState(shareStateToParams(s), s.mode)).toEqual(s);
	});
});

// ---------------------------------------------------------------------------
// URL building
// ---------------------------------------------------------------------------

describe('buildShareUrl', () => {
	it('encodes the mode in the route', () => {
		const url = buildShareUrl(base({ query: 'sharkey', mode: 'tableFiles', sortBy: 'search' }));
		expect(url).toBe(`${window.location.origin}/tables?query=sharkey`);
	});
	it('has no query string for an empty state', () => {
		expect(buildShareUrl(base())).toBe(`${window.location.origin}/games`);
	});
});
