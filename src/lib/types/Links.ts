import type { FileUrl } from './VPin';

export interface Link {
	id: string;
	urls: FileUrl[];
	imgUrl?: string;
	title: string;
	subTitle?: string;
	description?: string;
	tags?: string[];
}

export const EmptyLink: Link = {
	title: '???',
	urls: [],
	id: ''
};
