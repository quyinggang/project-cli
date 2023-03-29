import path from 'path';
import { defineConfig } from 'vite';
import pug from "rollup-plugin-pug";
import pxtorem from "postcss-pxtorem";

export default defineConfig(({ command }) => {
  const baseUrl = command === 'build' ? '/screen/' : '/';
  return {
    base: baseUrl,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    plugins: [pug({})],
    css: {
      preprocessorOptions: {
        styl: {
          imports: [path.resolve(__dirname, "src/style/variable.styl")],
        },
      },
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
