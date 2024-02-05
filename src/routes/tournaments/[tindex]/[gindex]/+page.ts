import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { tindex, gindex } = params;

	return {
		tindex: parseInt(tindex),
		gindex: parseInt(gindex)
	};
};
