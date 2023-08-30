import { fileURLToPath, URL } from 'node:url'

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
    }),
  ],
  build: {
    lib: {
      name: 'VueTempVar',
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue']
    },
  },
})
