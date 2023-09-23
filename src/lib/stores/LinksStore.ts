import { get, writable } from 'svelte/store';
import { DB_URL } from '../../env';
import type { Link } from '$lib/types/Links';
import { nanoid } from 'nanoid';

const dummy: Link[] = [
	{
		id: nanoid(10),
		title: 'VP Universe',
		subTitle: 'Where dem files at',
		description: 'The biggest forum right now.',
		urls: [{ url: 'vpuniverse.com' }],
		tags: ['Downloads', 'Forum']
	},
	{
		id: nanoid(10),
		title: 'VP Forum',
		subTitle: 'Oldie but goldie',
		description: 'The second biggest forum right now.',
		urls: [{ url: 'vpforums.com' }],
		tags: ['Downloads', 'Forum']
	},
	{
		id: nanoid(10),
		title: 'VPS',
		subTitle: 'Thats me!',
		description: 'More spreadsheets.',
		urls: [{ url: 'https://virtualpinballspreadsheet.github.io/' }],
		tags: ['Downloads', 'Tutorials']
	},
	{
		id: nanoid(10),
		title: 'Visual Pinball Addicts',
		subTitle: 'Facebook group',
		description: 'Lots of people here.',
		urls: [{ url: 'https://www.facebook.com/groups/VPAddicts/' }],
		tags: ['Forum']
	},
	{
		id: nanoid(10),
		title: 'Mjrnet Pinball Guide',
		subTitle: 'Vpin bible',
		description: 'Praise the lord',
		urls: [{ url: 'http://mjrnet.org/' }],
		tags: ['Tutorials']
	}
];

const linksStore = writable<Link[]>(dummy);

const fetchDb = async () => {
	try {
		const res = await fetch(DB_URL);
		const links = (await res.json()) as Link[];
		linksStore.set(links);
	} catch (e) {
		console.log(e);
	}
};

// fetchDb();

export const Links = {
	linksStore
};
