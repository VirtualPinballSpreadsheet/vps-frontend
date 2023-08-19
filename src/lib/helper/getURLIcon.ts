import {
	faCircle,
	faCloudArrowDown,
	faEarthAmericas,
	faExternalLink,
	faListUl,
	faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { faDropbox, faFacebook, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import type { FileUrl } from '$lib/types/VPin';

export const getURLIcon = (url: FileUrl) => {
	if (!url.url) {
		return { tooltip: '???', class: 'variant-soft', icon: faQuestionCircle, title: '???', ...url };
	}

	if (url.url.includes('vpuniverse'))
		return {
			tooltip: 'VPUniverse',
			class: 'variant-ghost-tertiary',
			icon: faEarthAmericas,
			title: 'VPU',
			...url
		};

	if (url.url.includes('vpforums'))
		return {
			tooltip: 'VP Forums',
			class: 'variant-ghost-warning',
			icon: faListUl,
			title: 'VPF',
			...url
		};

	if (url.url.includes('drive.google'))
		return {
			tooltip: 'Google Drive',
			class: 'variant-ghost-surface',
			icon: faGoogleDrive,
			title: 'GDrive',
			...url
		};

	if (url.url.includes('facebook'))
		return {
			tooltip: 'Facebook',
			class: 'variant-ghost-tertiary',
			icon: faFacebook,
			title: 'Facebook',
			...url
		};

	if (url.url.includes('mega'))
		return {
			tooltip: 'Mega',
			class: 'variant-ghost-primary',
			icon: faCloudArrowDown,
			title: 'Mega',
			...url
		};

	if (url.url.includes('dropbox'))
		return {
			tooltip: 'Dropbox',
			class: 'variant-ghost-secondary',
			icon: faDropbox,
			title: 'Dropbox',
			...url
		};

	if (url.url.includes('zen'))
		return {
			tooltip: 'Zen Pinball',
			class: 'variant-ghost-surface',
			icon: faCircle,
			title: 'Zen',
			...url
		};

	return {
		tooltip: 'External',
		class: 'variant-ghost-success',
		icon: faExternalLink,
		title: 'Ext',
		...url
	};
};
