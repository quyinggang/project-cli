import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const baseUrl = command === 'build' ? '/screen/' : '/';
  return {
    base: baseUrl,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.less";',
        }
      }
    }
  }
});
