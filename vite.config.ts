import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      iconCustomizer(collection, icon, props) {
        props.color = '#757575';
      },
    }),
    Components({
      resolvers: [IconsResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  }
});
