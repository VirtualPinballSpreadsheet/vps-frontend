import { describe, it, expect } from 'vitest';
import type { TableFile } from '$lib/types/VPin';
import { PasteTable, PasteB2S, PasteWheel, hasGenAiDisclosure } from './paste';

const vpuPaste = (name: string, description: string): string =>
	JSON.stringify({
		name,
		description,
		dateModified: '2024-06-01T00:00:00Z',
		softwareVersion: '1.5.3',
		author: { name: 'Tester' },
		url: 'https://www.vpuniverse.example/table/1234'
	});

const pastedFeatures = (paste: PasteTable | PasteB2S, json: string): string[] =>
	(paste.newFromPaste(json)?.[0] as TableFile | undefined)?.features ?? [];

describe('hasGenAiDisclosure', () => {
	it('flags common AI disclosures (case-insensitive)', () => {
		for (const text of [
			'Made with ChatGPT',
			'some chatgpt help',
			'Chat GPT wrote the rules text',
			'GenAI artwork',
			'uses GENAI textures',
			'AI generated playfield',
			'ai-generated plastics'
		]) {
			expect(hasGenAiDisclosure(text), text).toBe(true);
		}
	});

	it('"AI-Free" outweighs any mention', () => {
		expect(hasGenAiDisclosure('AI-Free table, no chatgpt anywhere')).toBe(false);
		expect(hasGenAiDisclosure('100% hand made - AI-Free')).toBe(false);
	});

	it('plain descriptions stay unflagged', () => {
		expect(hasGenAiDisclosure('fun table with fozzy physics')).toBe(false);
		expect(hasGenAiDisclosure('')).toBe(false);
		// "ai" as a substring (e.g. said, claimed) must not match
		expect(hasGenAiDisclosure('he claimed it was a said design')).toBe(false);
	});
});

describe('GenAI feature on paste', () => {
	it('turns the feature on for tables when the disclosure is present', () => {
		const features = pastedFeatures(
			new PasteTable(),
			vpuPaste('My Table', 'Backgrounds are GenAI')
		);
		expect(features).toContain('GenAI');
	});

	it('turns the feature on for backglasses, including in the name', () => {
		const features = pastedFeatures(
			new PasteB2S(),
			vpuPaste('My Table (ChatGPT art) B2S', 'boring')
		);
		expect(features).toContain('GenAI');
	});

	it('leaves features alone when nothing is disclosed or AI-Free is stated', () => {
		expect(pastedFeatures(new PasteTable(), vpuPaste('Table', 'hand made'))).toEqual([]);
		expect(pastedFeatures(new PasteTable(), vpuPaste('Table', 'AI-Free, promised'))).toEqual([]);
	});

	it('is not applied to other file types (wheel art)', () => {
		const files = new PasteWheel().newFromPaste(vpuPaste('Wheel (GenAI)', 'neon'));
		expect(((files?.[0] as TableFile | undefined)?.features ?? []) as string[]).not.toContain(
			'GenAI'
		);
	});

	it('non-JSON paste throws as before (base parser behavior)', () => {
		expect(() => new PasteTable().newFromPaste('not json')).toThrow();
	});
});
