import type { FileUrl } from '$lib/types/VPin';

export const getUrl = (urls: FileUrl[]) => {
	const _urls = urls.filter((u) => !u.broken);
	return _urls.length ? _urls[0].url : '';
};
