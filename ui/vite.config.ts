/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import ViteIconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [
    Vue(),
    WindiCSS(),
    Pages(),
    Components({
      dts: true,
      resolvers: ViteIconsResolver({ componentPrefix: '' }),
    }),
    Icons(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'vitest',
      ],
      dts: true,
    }),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
    ],
  },
})
