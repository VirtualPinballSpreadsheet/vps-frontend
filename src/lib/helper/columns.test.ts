import { describe, it, expect } from 'vitest';
import {
	getColumns,
	sortRows,
	pageCount,
	clampPage,
	pageSlice,
	rangeLabel,
	linkLabel,
	type SortState
} from './columns';
import { fileTypes, EmptyGame, EmptyFile, type Game, type TableFile } from '$lib/types/VPin';
import type { Mode } from '$lib/types/Filter';

const game = (over: Partial<Game> = {}): Game => ({ ...EmptyGame, ...over });
const tableFile = (over: Partial<TableFile> = {}): TableFile => ({
	...EmptyFile,
	tableFormat: 'VPX',
	...over
});

const valueOf = (mode: Mode, colId: string, item: any) =>
	getColumns(mode)
		.find((c) => c.id === colId)!
		.getValue(item);

describe('column definitions', () => {
	const allModes: Mode[] = ['game', ...fileTypes];

	it('every mode has columns with unique ids', () => {
		for (const mode of allModes) {
			const cols = getColumns(mode);
			expect(cols.length, mode).toBeGreaterThan(2);
			const ids = cols.map((c) => c.id);
			expect(new Set(ids).size, `${mode} duplicate ids`).toBe(ids.length);
			for (const c of cols) {
				expect(c.header, `${mode}.${c.id} header`).toBeTruthy();
				expect(typeof c.getValue, `${mode}.${c.id} getValue`).toBe('function');
			}
		}
	});

	it('Games, Tables and Backglasses carry a picture on the first column; other modes do not', () => {
		expect(getColumns('game')[0].getThumb).toBeTypeOf('function');
		expect(getColumns('tableFiles')[0].getThumb).toBeTypeOf('function');
		expect(getColumns('b2sFiles')[0].getThumb).toBeTypeOf('function');
		expect(getColumns('romFiles')[0].getThumb).toBeUndefined();
		expect(getColumns('ruleFiles')[0].getThumb).toBeUndefined();
	});

	it('games columns read game fields', () => {
		const g = game({
			name: 'Media Wrapper',
			manufacturer: 'Bally',
			year: 1981,
			type: 'SS',
			players: 4,
			designers: ['Someone', 'Else'],
			theme: ['Music'],
			lastCreatedAt: 555,
			updatedAt: 111,
			tableFiles: [tableFile({ tableFormat: 'VPX' }), tableFile({ tableFormat: 'FX3' })]
		});
		expect(valueOf('game', 'name', g)).toBe('Media Wrapper');
		expect(valueOf('game', 'year', g)).toBe(1981);
		expect(valueOf('game', 'designers', g)).toBe('Someone, Else');
		expect(valueOf('game', 'themes', g)).toBe('Music');
		expect(valueOf('game', 'formats', g)).toBe('FX3, VPX');
		// lastCreatedAt wins when present
		expect(valueOf('game', 'updated', g)).toBe(555);
	});

	it('formats column dedupes', () => {
		const g = game({
			tableFiles: [tableFile({ tableFormat: 'VPX' }), tableFile({ tableFormat: 'VPX' })]
		});
		expect(valueOf('game', 'formats', g)).toBe('VPX');
	});

	it('themes are listed alphabetically, not in stored order', () => {
		const g = game({ theme: ['Music', 'Aliens', 'Movies'] });
		expect(valueOf('game', 'themes', g)).toBe('Aliens, Movies, Music');
		expect(valueOf('game', 'themes', game({ theme: [] }))).toBeUndefined();
	});

	it('features follow the canonical vocabulary order, unknown ones last and alphabetical', () => {
		const f = tableFile({ features: ['TotallyNew', 'SSF', 'BAM', 'AnotherNew'] });
		// SSF precedes BAM in TableFeatures; unknowns sort alphabetically after all known ones
		expect(valueOf('tableFiles', 'features', f)).toBe('SSF, BAM, AnotherNew, TotallyNew');
	});

	it('b2s features use the b2s vocabulary', () => {
		const f = { ...EmptyFile, features: ['FullDMD', '2Screens'] };
		expect(valueOf('b2sFiles', 'features', f)).toBe('2Screens, FullDMD');
	});

	it('tables columns read file fields', () => {
		const f = tableFile({
			edition: 'DX',
			tableFormat: 'FX3',
			authors: ['first', 'chain'],
			features: ['SSF', 'MOD'],
			createdAt: 222,
			updatedAt: 111,
			game: { id: 'g1', name: 'Cyclon' }
		});
		expect(valueOf('tableFiles', 'name', f)).toBe('Cyclon');
		expect(valueOf('tableFiles', 'edition', f)).toBe('DX');
		expect(valueOf('tableFiles', 'format', f)).toBe('FX3');
		expect(valueOf('tableFiles', 'authors', f)).toBe('first, chain');
		// canonical TableFeatures order: MOD precedes SSF
		expect(valueOf('tableFiles', 'features', f)).toBe('MOD, SSF');
		// createdAt wins for files
		expect(valueOf('tableFiles', 'updated', f)).toBe(222);
	});

	it('per-mode extras', () => {
		expect(valueOf('romFiles', 'colored', { ...EmptyFile, colored: true })).toBe(true);
		expect(valueOf('romFiles', 'fileName', { ...EmptyFile, fileName: 'game.rom' })).toBe(
			'game.rom'
		);
		expect(valueOf('wheelArtFiles', 'animated', { ...EmptyFile, animated: true })).toBe(true);
		expect(valueOf('altColorFiles', 'type', { ...EmptyFile, type: 'color' })).toBe('color');
		expect(
			valueOf('tutorialFiles', 'title', { title: 'How to', authors: [], updatedAt: 1, id: 't' })
		).toBe('How to');
	});

	it('the shared file layout is used by the simple modes', () => {
		const ids = getColumns('pupPackFiles').map((c) => c.id);
		expect(ids).toEqual(['game', 'version', 'authors', 'comment', 'links', 'updated']);
		expect(getColumns('ruleFiles').map((c) => c.id)).toEqual(ids);
	});
});

describe('comment columns', () => {
	it('every file mode except tutorials has a non-sortable comment column', () => {
		for (const mode of fileTypes) {
			if (mode === 'tutorialFiles') continue; // TutorialFile has no comment
			const col = getColumns(mode).find((c) => c.id === 'comment');
			expect(col, `${mode} has comment column`).toBeDefined();
			// wheel art notes are short and central: inline text, not a glyph
			expect(col!.kind, `${mode} kind`).toBe(mode === 'wheelArtFiles' ? 'text' : 'comment');
			expect(col!.sortable).toBe(false);
		}
		expect(getColumns('game').find((c) => c.id === 'comment')).toBeUndefined();
		expect(getColumns('tutorialFiles').find((c) => c.id === 'comment')).toBeUndefined();
	});

	it('reads the file comment', () => {
		const f = { ...EmptyFile, comment: 'requires VPW physics' };
		expect(valueOf('tableFiles', 'comment', f)).toBe('requires VPW physics');
		expect(valueOf('pupPackFiles', 'comment', { ...EmptyFile, comment: 'x' })).toBe('x');
	});
});

describe('count columns (games view)', () => {
	it('one numeric column per file type, right of Updated', () => {
		const cols = getColumns('game');
		const ids = cols.map((c) => c.id);
		for (const key of fileTypes) {
			const col = cols.find((c) => c.id === `count-${key}`);
			expect(col, `count-${key}`).toBeDefined();
			expect(col!.kind).toBe('count');
		}
		// last-but-counts order: counts come after everything else
		expect(ids[ids.length - fileTypes.length]).toBe(`count-${fileTypes[0]}`);
		expect(ids[ids.indexOf('updated') + 1]).toBe(`count-${fileTypes[0]}`);
	});

	it('counts each file array', () => {
		const g = game({
			tableFiles: [tableFile(), tableFile()],
			wheelArtFiles: [{ ...EmptyFile, animated: true }],
			tutorialFiles: [],
			ruleFiles: [{ ...EmptyFile }, { ...EmptyFile }, { ...EmptyFile }]
		});
		expect(valueOf('game', 'count-tableFiles', g)).toBe(2);
		expect(valueOf('game', 'count-wheelArtFiles', g)).toBe(1);
		expect(valueOf('game', 'count-ruleFiles', g)).toBe(3);
		// zero, not empty: sorts as a real value
		expect(valueOf('game', 'count-tutorialFiles', g)).toBe(0);
		expect(valueOf('game', 'count-pupPackFiles', g)).toBe(0);
	});

	it('ascending count sort surfaces the gaps first', () => {
		const rows = [
			game({ id: 'x', name: 'X', wheelArtFiles: [{ ...EmptyFile }] }),
			game({ id: 'y', name: 'Y' }),
			game({ id: 'z', name: 'Z', wheelArtFiles: [{ ...EmptyFile }, { ...EmptyFile }] })
		];
		const asc = sortRows(rows, getColumns('game'), {
			colId: 'count-wheelArtFiles',
			dir: 'asc'
		});
		expect(asc.map((g) => g.id)).toEqual(['y', 'x', 'z']);
	});
});

describe('links columns', () => {
	const getLinks = (mode: Mode, item: any) =>
		getColumns(mode).find((c) => c.id === 'links')!.getLinks!(item);

	it('every mode exposes a non-sortable links column', () => {
		for (const mode of ['game', ...fileTypes] as Mode[]) {
			const col = getColumns(mode).find((c) => c.id === 'links');
			expect(col, `${mode} has links column`).toBeDefined();
			expect(col!.kind).toBe('links');
			expect(col!.sortable).toBe(false);
		}
	});

	it('file modes expose their upload urls', () => {
		const modes: Mode[] = [
			'tableFiles',
			'b2sFiles',
			'romFiles',
			'altColorFiles',
			'wheelArtFiles',
			'pupPackFiles',
			'altSoundFiles',
			'topperFiles',
			'povFiles',
			'mediaPackFiles',
			'ruleFiles'
		];
		for (const mode of modes) {
			const urls = [{ url: 'https://vpuniverse.com/x' }];
			expect(getLinks(mode, { ...EmptyFile, urls }), mode).toEqual(urls);
		}
	});

	it('broken and empty urls are dropped', () => {
		const f = {
			...EmptyFile,
			urls: [
				{ url: 'https://vpuniverse.com/good' },
				{ url: 'https://vpuniverse.com/dead', broken: true },
				{ url: '' }
			]
		};
		expect(getLinks('tableFiles', f)).toEqual([{ url: 'https://vpuniverse.com/good' }]);
	});

	it('games link out to IPDB only', () => {
		expect(getLinks('game', game({ ipdbUrl: 'https://ipdb.org/title?id=1' }))).toEqual([
			{ url: 'https://ipdb.org/title?id=1' }
		]);
		expect(getLinks('game', game())).toEqual([]);
	});

	it('tutorials link out via youtubeId and/or url', () => {
		const t = { authors: [], updatedAt: 1, id: 't', title: 'x' };
		expect(getLinks('tutorialFiles', { ...t, youtubeId: 'abc' })).toEqual([
			{ url: 'https://www.youtube.com/watch?v=abc' }
		]);
		expect(
			getLinks('tutorialFiles', { ...t, youtubeId: 'abc', url: 'https://example.com/x' })
		).toHaveLength(2);
		expect(getLinks('tutorialFiles', t)).toEqual([]);
	});

	it('labels shorten hosts the way the cards do', () => {
		expect(linkLabel({ url: 'https://vpuniverse.com/tables/1' })).toBe('VPU');
		expect(linkLabel({ url: 'https://www.vpforums.org/index.php' })).toBe('VPF');
		expect(linkLabel({ url: 'https://drive.google.com/x' })).toBe('GDrive');
		expect(linkLabel({ url: 'https://youtu.be/abc' })).toBe('YT');
		expect(linkLabel({ url: 'https://www.youtube.com/watch?v=abc' })).toBe('YT');
		expect(linkLabel({ url: 'https://ipdb.org/title?id=1' })).toBe('IPDB');
		expect(linkLabel({ url: 'https://somewhere.example/f' })).toBe('Ext');
	});
});

describe('sortRows', () => {
	const rows = [
		game({ id: 'c', name: 'Cyclon', manufacturer: 'Bally', year: 1981 }),
		game({ id: 'a', name: 'Attack from Mars', manufacturer: 'Bally', year: 1995 }),
		game({ id: 'b', name: 'Black Knight', manufacturer: 'Williams', year: 1980 }),
		game({ id: 'd', name: 'Dino', manufacturer: 'Data East', year: 0 })
	];
	const cols = getColumns('game');
	const byName = (dir: 'asc' | 'desc'): SortState => ({ colId: 'name', dir });

	it('no sort returns the original array untouched', () => {
		expect(sortRows(rows, cols, null)).toBe(rows);
	});
	it('unknown column id is a no-op', () => {
		expect(sortRows(rows, cols, { colId: 'nope', dir: 'asc' })).toBe(rows);
	});
	it('sorts strings ascending / descending', () => {
		expect(sortRows(rows, cols, byName('asc')).map((g) => g.name)).toEqual([
			'Attack from Mars',
			'Black Knight',
			'Cyclon',
			'Dino'
		]);
		expect(sortRows(rows, cols, byName('desc')).map((g) => g.name)).toEqual([
			'Dino',
			'Cyclon',
			'Black Knight',
			'Attack from Mars'
		]);
	});
	it('sorts numbers numerically, not lexicographically', () => {
		expect(sortRows(rows, cols, { colId: 'year', dir: 'asc' }).map((g) => g.year)).toEqual([
			0, 1980, 1981, 1995
		]);
	});
	it('ties keep the incoming (global) order — stable sort', () => {
		const afm = game({ id: '1', name: 'Attack from Mars', manufacturer: 'Bally' });
		const med = game({ id: '2', name: 'Media Wrapper', manufacturer: 'Bally' });
		const sorted = sortRows([afm, med], cols, { colId: 'manufacturer', dir: 'asc' });
		expect(sorted.map((g) => g.id)).toEqual(['1', '2']);
	});
	it('empty values sort last in both directions', () => {
		const withEmpty = [
			...rows,
			game({ id: 'e', name: 'ZZZ', players: undefined }),
			game({ id: 'f', name: 'AAA', players: 2 })
		];
		const asc = sortRows(withEmpty, cols, { colId: 'players', dir: 'asc' });
		const desc = sortRows(withEmpty, cols, { colId: 'players', dir: 'desc' });
		expect(asc[asc.length - 1].id).toBe('e');
		expect(desc[desc.length - 1].id).toBe('e');
	});
	it('does not mutate the input', () => {
		const input = [...rows];
		sortRows(input, cols, byName('asc'));
		expect(input).toEqual(rows);
	});
});

describe('pagination', () => {
	it('pageCount treats "all" (<=0) as one page', () => {
		expect(pageCount(5000, 0)).toBe(1);
		expect(pageCount(0, 100)).toBe(1);
		expect(pageCount(250, 100)).toBe(3);
		expect(pageCount(201, 100)).toBe(3);
	});
	it('clampPage stays within range', () => {
		expect(clampPage(5, 250, 100)).toBe(3);
		expect(clampPage(0, 250, 100)).toBe(1);
		expect(clampPage(9, 0, 100)).toBe(1);
	});
	it('pageSlice windows and "all" passes through', () => {
		const rows = Array.from({ length: 250 }, (_, i) => i);
		expect(pageSlice(rows, 2, 100)).toEqual(Array.from({ length: 100 }, (_, i) => i + 100));
		expect(pageSlice(rows, 3, 100)).toEqual(Array.from({ length: 50 }, (_, i) => i + 200));
		expect(pageSlice(rows, 1, 0)).toBe(rows);
	});
	it('rangeLabel', () => {
		expect(rangeLabel(0, 1, 100)).toBe('No results');
		expect(rangeLabel(3482, 1, 100)).toBe('1–100 of 3,482');
		expect(rangeLabel(3482, 35, 100)).toBe('3,401–3,482 of 3,482');
		expect(rangeLabel(3482, 1, 0)).toBe('all 3,482');
	});
});
