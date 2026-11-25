import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// Vitest config, kept separate from vite.config.ts so the SvelteKit dev/build
// pipeline is left untouched. The sveltekit() plugin gives us the $lib alias
// and .svelte compilation; jsdom provides a DOM for component tests.
//
// Run with:  npm test          (single run, CI-friendly)
//            npm run test:watch (watch mode)
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		// Registers @testing-library/svelte's afterEach cleanup so component
		// tests are drop-in. Harmless for pure-logic tests.
		setupFiles: ['@testing-library/svelte/vitest']
	}
});
