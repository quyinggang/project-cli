import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pxtorem from "postcss-pxtorem"

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
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 100,
            propList: ["*"],
            selectorBlackList: ["body", "html"],
          }),
        ],
      },
    },
  }
});
