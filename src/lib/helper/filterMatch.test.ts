import { describe, it, expect } from 'vitest';
import { matchList, matchSingle, matchTableFeatures } from './filterMatch';

describe('matchList', () => {
	it('include: requires ALL selected values to be mentioned', () => {
		expect(matchList(['a', 'b', 'c'], ['a', 'c'], false)).toBe(true);
		expect(matchList(['a', 'b'], ['a', 'z'], false)).toBe(false);
	});
	it('include: undefined candidates match nothing', () => {
		expect(matchList(undefined, ['a'], false)).toBe(false);
	});
	it('exclude: keeps results that mention NONE of the values', () => {
		expect(matchList(['x', 'y'], ['a', 'b'], true)).toBe(true);
		expect(matchList(['x', 'a'], ['a', 'b'], true)).toBe(false);
	});
	it('exclude: a single value negates include exactly', () => {
		for (const candidates of [['a'], ['a', 'b'], []] as string[][]) {
			expect(matchList(candidates, ['a'], true)).toBe(!matchList(candidates, ['a'], false));
		}
	});
	it('multiple values: exclude is "none of these", not a literal De Morgan negation', () => {
		// partial mention: include fails, and exclude must also fail (it mentions one)
		expect(matchList(['a'], ['a', 'b'], false)).toBe(false);
		expect(matchList(['a'], ['a', 'b'], true)).toBe(false);
	});
	it('empty selection is a no-op in both modes', () => {
		expect(matchList(['a'], [], false)).toBe(true);
		expect(matchList(['a'], [], true)).toBe(true);
		expect(matchList(undefined, [], true)).toBe(true);
	});

	describe('firstOnly', () => {
		it('include: only the first author counts', () => {
			expect(matchList(['Teisen', 'Jubilee', 'Fransoy'], ['Teisen'], false, true)).toBe(true);
			// later in the chain -> not the first author
			expect(matchList(['Teisen', 'Jubilee'], ['Jubilee'], false, true)).toBe(false);
		});
		it('include: all values must equal the single first author', () => {
			expect(matchList(['Teisen', 'Jubilee'], ['Teisen', 'Jubilee'], false, true)).toBe(false);
		});
		it('exclude: file counts as mentioning only its first author', () => {
			// 'Jubilee' is only in the chain, not first -> excluded filter keeps it
			expect(matchList(['Teisen', 'Jubilee'], ['Jubilee'], true, true)).toBe(true);
			expect(matchList(['Teisen', 'Jubilee'], ['Teisen'], true, true)).toBe(false);
		});
		it('undefined candidates never match, but always satisfy exclude', () => {
			expect(matchList(undefined, ['a'], false, true)).toBe(false);
			expect(matchList(undefined, ['a'], true, true)).toBe(true);
		});
	});
});

describe('matchSingle', () => {
	it('include: candidate must be one of the values', () => {
		expect(matchSingle('Bally', ['Bally', 'Williams'], false)).toBe(true);
		expect(matchSingle('Data East', ['Bally', 'Williams'], false)).toBe(false);
	});
	it('exclude: keeps candidates outside the values', () => {
		expect(matchSingle('Data East', ['Bally', 'Williams'], true)).toBe(true);
		expect(matchSingle('Bally', ['Bally', 'Williams'], true)).toBe(false);
	});
	it('missing candidate is treated as no manufacturer', () => {
		expect(matchSingle(undefined, ['Bally'], false)).toBe(false);
		expect(matchSingle(undefined, ['Bally'], true)).toBe(true);
	});
});

describe('matchTableFeatures', () => {
	const table = { features: ['MOD', 'FastFlips'], tableFormat: 'VPX' };
	it('include: table format counts as a feature', () => {
		expect(matchTableFeatures(table, ['MOD', 'VPX'], false)).toBe(true);
		expect(matchTableFeatures(table, ['SlowFlips'], false)).toBe(false);
	});
	it('exclude: keeps tables mentioning none of the values', () => {
		expect(matchTableFeatures(table, ['SlowFlips'], true)).toBe(true);
		expect(matchTableFeatures(table, ['MOD'], true)).toBe(false);
		// the format counts too: excluding VPX drops this table
		expect(matchTableFeatures(table, ['VPX'], true)).toBe(false);
	});
	it('table without features or format', () => {
		expect(matchTableFeatures({}, ['MOD'], false)).toBe(false);
		expect(matchTableFeatures({}, ['MOD'], true)).toBe(true);
	});
});
