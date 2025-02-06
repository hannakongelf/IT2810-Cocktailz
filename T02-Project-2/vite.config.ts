/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/project2',
	plugins: [react()],
	server: {
		open: true,
	},
	build: {
		outDir: 'dist-frontend', // Set the output directory to dist-frontend
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['**/*.{test,spec}.{ts,tsx}'],
		setupFiles: 'frontend/src/test/setup.ts',
	},
});
