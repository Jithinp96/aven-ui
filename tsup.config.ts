import { copyFileSync, mkdirSync } from 'fs'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
  onSuccess() {
    mkdirSync('dist/styles', { recursive: true })
    copyFileSync('src/styles/tokens.css', 'dist/styles/tokens.css')
    copyFileSync('src/styles/index.css', 'dist/styles/index.css')
    console.log('Styles copied to dist/styles/')
  },
})
