import { cpSync } from 'fs'
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
    cpSync('src/styles', 'dist/styles', { recursive: true })
    console.log('Styles copied to dist/styles/')
  },
})
