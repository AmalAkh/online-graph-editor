import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"",
  server:{port:8000},
  preview:{
    host:true,
    port:8001,
    strictPort:true,
    origin:"http://0.0.0.0:8001"
  }
})
