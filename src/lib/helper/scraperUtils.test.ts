import { describe, it, expect } from 'vitest';
import type { Game } from '$lib/types/VPin';
import { EmptyGame, fileTypes } from '$lib/types/VPin';
import type { ReportAction } from '$lib/types/Scraper';
import {
	actionDate,
	findUpdateTarget,
	gameLabel,
	kindToFileType,
	makeSeedFile,
	resolveDate,
	sameFirstAuthor,
	sortKinds,
	vkey
} from './scraperUtils';

const action = (over: Partial<ReportAction> = {}): ReportAction => ({
	action: 'new',
	message: 'Add',
	kind: 'table',
	detail: {
		detailKind: 'list',
		url: 'https://vpuniverse.com/files/file/1-x/',
		normalizedURL: 'https://vpuniverse.com/files/file/1-x/',
		site: 'VPU',
		kind: 'table',
		name: 'X',
		author: 'Author',
		images: [],
		date: 'undated'
	},
	...over
});

const game = (over: Partial<Game> = {}): Game =>
	({ ...structuredClone(EmptyGame), id: 'g1', name: 'Game', ...over } as Game);

describe('kindToFileType', () => {
	it('maps every scannable kind to a real fileTypes key', () => {
		for (const key of Object.values(kindToFileType)) {
			expect(fileTypes).toContain(key);
		}
		// the kinds ReportCommand actually scans
		for (const kind of [
			'table',
			'b2s',
			'rom',
			'pupPack',
			'altColor',
			'altSound',
			'pov',
			'wheelArt',
			'topper',
			'mediaPack',
			'rule'
		] as const) {
			expect(kindToFileType[kind], kind).toBeDefined();
		}
		// non-resource kinds are absent
		expect(kindToFileType.game).toBeUndefined();
		expect(kindToFileType.sound).toBeUndefined();
	});
});

describe('resolveDate', () => {
	it('passes epoch ms through', () => {
		expect(resolveDate({ date: { _0: 1795512660000 } })).toBe(1795512660000);
	});
	it('converts legacy seconds-since-2001 (CFAbsoluteTime) reports', () => {
		// value from the pre-fix published report: 24 Nov 2026
		expect(resolveDate({ date: { _0: 817205460 } })).toBe(1795512660000);
	});
	it('is undefined for unknown/undated', () => {
		expect(resolveDate('undated')).toBeUndefined();
		expect(resolveDate('unknown')).toBeUndefined();
		expect(resolveDate(undefined)).toBeUndefined();
	});
});

describe('actionDate', () => {
	it('uses detail.date', () => {
		const a = action();
		expect(
			actionDate(action({ detail: { ...a.detail, date: { date: { _0: 1795512660000 } } } }))
		).toBe(1795512660000);
	});
	it('falls back to now when the report has no date', () => {
		const before = new Date().getTime();
		const t = actionDate(action()); // detail.date: 'undated'
		expect(t).toBeGreaterThanOrEqual(before);
		expect(t).toBeLessThanOrEqual(new Date().getTime());
	});
});

describe('vkey & sortKinds & gameLabel', () => {
	it('keys by kind + url', () => {
		const a = action();
		expect(vkey(a)).toBe('table|https://vpuniverse.com/files/file/1-x/');
	});
	it('sorts in scraper scan order', () => {
		expect(sortKinds(['wheelArt', 'table', 'rom'])).toEqual(['table', 'rom', 'wheelArt']);
	});
	it('labels games with manufacturer and year', () => {
		expect(gameLabel(game({ name: 'Medieval', manufacturer: 'Bally', year: 1977 }))).toBe(
			'Medieval Bally (1977)'
		);
		expect(gameLabel(game({ name: 'Untitled', manufacturer: '', year: 0 }))).toBe('Untitled');
	});
});

describe('findUpdateTarget', () => {
	const url = 'https://www.vpforums.org/index.php?app=downloads&showfile=11609';

	it('finds by id first', () => {
		const g = game({
			tableFiles: [
				{ id: 'other', authors: [], updatedAt: 0, urls: [{ url }] },
				{ id: 'target', authors: [], updatedAt: 0, urls: [{ url: 'elsewhere' }] }
			]
		} as any);
		expect(findUpdateTarget(g, action({ action: 'update', id: 'target' }))?.id).toBe('target');
	});

	it('falls back to URL matching after normalization', () => {
		const g = game({
			tableFiles: [{ id: 'hit', authors: [], updatedAt: 0, urls: [{ url }] }]
		} as any);
		const a = action({
			action: 'update',
			detail: {
				...action().detail,
				normalizedURL: 'http://vpforums.org/index.php?app=downloads&showfile=11609/'
			}
		});
		expect(findUpdateTarget(g, a)?.id).toBe('hit');
	});

	it('returns undefined when no file matches', () => {
		const g = game({ tableFiles: [] });
		expect(findUpdateTarget(g, action({ action: 'update', id: 'zzz' }))).toBeUndefined();
	});
});

describe('makeSeedFile', () => {
	it('clones Action.file, re-ids it and re-points the game', () => {
		const a = action({
			file: {
				id: 'scraperId',
				authors: ['Vpeggy'],
				urls: [{ url: 'u' }],
				game: { id: 'PLACEHOLDER', name: 'Placeholder' },
				updatedAt: 123
			}
		});
		const file = makeSeedFile(a, game({ id: 'real', name: 'Real Game' }));
		expect(file.id).not.toBe('scraperId');
		expect(file.game).toEqual({ id: 'real', name: 'Real Game' });
		expect(file.authors).toEqual(['Vpeggy']);
		expect(file.urls).toEqual([{ url: 'u' }]);
		// the action's own file is untouched
		expect(a.file.game.id).toBe('PLACEHOLDER');
	});
});

describe('sameFirstAuthor', () => {
	it('matches only the first author of the same kind', () => {
		const a = action({
			file: { id: 's', authors: ['Author', 'Helper'], urls: [], updatedAt: 0 }
		});
		const g = game({
			tableFiles: [
				{ id: 'f1', authors: ['Author'], urls: [], updatedAt: 0 },
				{ id: 'f2', authors: ['Other', 'Author'], urls: [], updatedAt: 0 }
			],
			b2sFiles: [{ id: 'f3', authors: ['Author'], urls: [], updatedAt: 0 }]
		} as any);
		expect(sameFirstAuthor(g, a).map((f) => f.id)).toEqual(['f1']);
	});

	it('is empty without a seed author', () => {
		const g = game({ tableFiles: [{ id: 'f1', authors: [], urls: [], updatedAt: 0 }] } as any);
		expect(sameFirstAuthor(g, action())).toEqual([]);
	});
});
