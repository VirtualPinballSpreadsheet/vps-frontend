import { localStorageStore } from '@skeletonlabs/skeleton';

// ---------------------------------------------------------------------------
// How search results are rendered: the image grid or the data table.
// Persisted globally (same localStorage pattern as 'user', 'edits', ...).
// Deliberately NOT part of share links — a view preference is personal
// rendering, not search state.
// ---------------------------------------------------------------------------

export type ViewMode = 'grid' | 'table';

export const viewMode = localStorageStore<ViewMode>('viewMode', 'grid');

// Rows per page in table view. 0 means "all" — renders every row, janky on
// huge result sets but makes browser find-in-page (cmd-f) work.
export const rowsPerPage = localStorageStore<number>('rowsPerPage', 100);
