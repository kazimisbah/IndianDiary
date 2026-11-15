import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// `npm run build` produces ONE self-contained file: dist/index.html
// (all CSS and JS inlined), which you can upload to any static host.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
