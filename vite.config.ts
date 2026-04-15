import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    yaml()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})