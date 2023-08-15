import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { modeMapping } from '$lib/helper/modeMapping';

export const load: PageLoad = ({ params }) => {
	const { mode } = params;

	if (!mode) throw error(404, 'Not found');
	const entry = Object.entries(modeMapping).find(([k, v]) => v.route === mode);

	if (!entry) throw error(404, 'Not found');

	return {
		mode: entry[0] as keyof typeof modeMapping,
		...entry[1]
	};

	throw error(404, 'Not found');
};
