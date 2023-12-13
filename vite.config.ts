import { URL, fileURLToPath } from 'node:url'

import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue(),
		Dts({
			tsconfigPath: './tsconfig.lib.json',
			entryRoot: 'src',
			outDir: 'dist/types',
			copyDtsFiles: true,
			afterBuild: () => {
				// To pass publint (`npm x publint@latest`) and ensure the
				// package is supported by all consumers, we must export types that are
				// read as ESM. To do this, there must be duplicate types with the
				// correct extension supplied in the package.json exports field.
				copyFileSync('dist/types/index.d.ts', 'dist/types/index.d.cts')
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
