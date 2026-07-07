import { copyFileSync } from 'node:fs'

import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue(),
		Dts({
			tsconfigPath: './tsconfig.lib.json',
			entryRoot: 'src',
			copyDtsFiles: true,
			afterBuild: () => {
				// To pass publint (`npm x publint@latest`) and ensure the
				// package is supported by all consumers, we must export types that are
				// read as ESM. To do this, there must be duplicate types with the
				// correct extension supplied in the package.json exports field.
				// vite-plugin-dts >=5 emits declarations into dist/ directly
				// (custom outDir is no longer supported).
				copyFileSync('dist/index.d.ts', 'dist/index.d.cts')
			},
		}),
	],
	build: {
		lib: {
			name: 'VueTempVar',
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['vue'],
		},
	},
})
