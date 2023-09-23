import type { FileUrl } from './VPin';

export interface App {
	urls: FileUrl[];
	imgUrl?: string;
	title: string;
	subTitle?: string;
	description?: string;
	tags?: string[];
}
