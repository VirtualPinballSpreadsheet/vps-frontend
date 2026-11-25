import { get, writable } from 'svelte/store';
import { SCRAPER_REPORT_URL } from '../../env';
import type { ReportAction, ReportIndex, ScraperKind } from '$lib/types/Scraper';
import type { FileUpload, Game } from '$lib/types/VPin';
import type { GameEdit } from '$lib/types/EditVPin';
import { DB } from './DbStore';
import { Edit } from './EditStore';
import {
	actionDate,
	findUpdateTarget,
	kindToFileType,
	makeSeedFile,
	type FileTypeKey
} from '$lib/helper/scraperUtils';

export interface PendingSeed {
	action: ReportAction;
	fileType: FileTypeKey;
	/** Action.file, re-identified and pointed at the target game */
	file: FileUpload;
	gameId: string;
}

// In-memory working copy of the scraper report: rows are removed from here
// when resolved, and a Reload refetches the scraper's ground truth.
const report = writable<ReportIndex>({});
const loading = writable(false);
const loaded = writable(false);

// The action currently being applied through the game edit modal.
const pendingSeed = writable<PendingSeed | null>(null);

const load = async (): Promise<string | undefined> => {
	loading.set(true);
	try {
		const res = await fetch(SCRAPER_REPORT_URL);
		if (!res.ok) return `Failed to load report (${res.status}).`;
		report.set((await res.json()) as ReportIndex);
		loaded.set(true);
		return undefined;
	} catch (e) {
		return `Failed to load report: ${e}`;
	} finally {
		loading.set(false);
	}
};

/** drop a row from the in-memory copy (until the next Reload) */
const removeAction = (kind: ScraperKind, action: ReportAction) => {
	report.update((r) => {
		const list = r[kind] ?? [];
		const i = list.indexOf(action);
		if (i < 0) return r;
		return { ...r, [kind]: list.filter((_, j) => j !== i) };
	});
};

// saveEdit() only reads from the edit cache, so one-click applies go
// through it the same way the modal does (cleanupGame + optimistic db).
const queueEdit = (game: Game, action: 'UPDATE' | 'CREATE') => {
	Edit.editStore.update((s) => ({
		...s,
		cache: { id: game.id, action, data: game } as GameEdit
	}));
	Edit.saveEdit();
};

/** one-click "apply version + date"; returns false when the file can't be found */
const applyVersionUpdate = (action: ReportAction, version: string): boolean => {
	const game = action.gameId ? get(DB.dbStore)[action.gameId] : undefined;
	if (!game) return false;

	const clone = structuredClone(game) as Game;
	const target = findUpdateTarget(clone, action);
	if (!target) return false;
	target.version = version;
	// createdAt = when the resource changed on the source site (detail.date,
	// or now if undated); updatedAt = when our record changed
	target.createdAt = actionDate(action);
	target.updatedAt = new Date().getTime();

	queueEdit(clone, 'UPDATE');
	removeAction(action.kind, action);
	return true;
};

/**
 * Queue the game (or new game) with Action.file pre-inserted, and record the
 * seed so the edit modal can show its source panel. Caller opens the modal.
 */
const beginSeed = (action: ReportAction, game: Game, mode: 'UPDATE' | 'CREATE' = 'UPDATE') => {
	const fileType = kindToFileType[action.kind];
	if (!fileType || !action.file) return false;

	const seeded = structuredClone(game) as Game;
	const files = ((seeded[fileType] as FileUpload[] | undefined) ?? []).slice();
	files.unshift(makeSeedFile(action, game));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(seeded as any)[fileType] = files;

	Edit.editStore.update((s) => ({
		...s,
		cache: { id: seeded.id, action: mode, data: seeded } as GameEdit
	}));
	pendingSeed.set({
		action,
		fileType,
		file: (seeded[fileType] as FileUpload[])[0],
		gameId: game.id
	});
	return true;
};

const cancelSeed = () => pendingSeed.set(null);

export const Scraper = {
	report,
	loading,
	loaded,
	pendingSeed,
	load,
	removeAction,
	applyVersionUpdate,
	beginSeed,
	cancelSeed
};
