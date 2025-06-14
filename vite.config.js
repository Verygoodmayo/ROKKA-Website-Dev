import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vite.dev/config/
export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      }
    }
  },
  plugins: [react(), glsl({
    include: '**/*.glsl',
    exclude: 'node_modules/**',
    compress: true, // Compress the shader code
    transform: (code) => {
      // Optionally transform the shader code here
      return code;
    }
  })],
  base: '/ROKKA-Website-Dev/'
})
