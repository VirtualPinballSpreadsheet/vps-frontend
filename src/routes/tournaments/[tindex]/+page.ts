import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { tindex } = params;

	return {
		tindex: parseInt(tindex)
	};
};
