import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */

const dev = process.env.NODE_ENV === 'development';
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// pages: 'build',
			// assets: 'build',
			fallback: '404.html'
			// precompress: false
		}),

		// trailingSlash: 'always',
		paths: {
			base: dev ? '' : ''
		}
	}
};
export default config;
