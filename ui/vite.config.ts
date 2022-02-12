/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import istanbul from 'vite-plugin-istanbul'
import Icons from 'unplugin-icons/vite'
import ViteIconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
  server: {
    port: 4000,
  },
  test: {
    global: true,
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
        'vitest',
      ],
      dts: true,
    }),
    istanbul({
      include: ['src/store/*', 'src/pages/*', 'src/components/*'],
      exclude: ['node_modules', 'tests/'],
      extension: ['.js', '.ts', '.vue'],
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
