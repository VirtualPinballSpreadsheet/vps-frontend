import { join } from 'path';
import type { Config } from 'tailwindcss';
import { colorMap } from './src/lib/helper/colorMap';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import { vpsTheme } from './vpsTheme';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	safelist: [...Object.values(colorMap)],
	theme: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: {
				custom: [vpsTheme]
			}
		})
	]
} satisfies Config;

export default config;
