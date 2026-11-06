import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sirve desde https://ericsnet.github.io/Abuel-os-Downloads/
// El build se escribe directamente en ../docs, que es lo que publica pages.yml.
export default defineConfig({
  base: '/Abuel-os-Downloads/',
  plugins: [react()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
