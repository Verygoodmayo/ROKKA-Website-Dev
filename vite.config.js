import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
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
