import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    '@vue-macros/nuxt',
    '@pinia/nuxt',
    'nuxt-simple-robots',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  alias: {
    '@': resolve(__dirname, './src'),
  },

  runtimeConfig: {
    public: {
      COS_BUCKETNAME: process.env.COS_BUCKETNAME,
      COS_REGION: process.env.COS_REGION,
      COS_SECRET_ID: process.env.COS_SECRET_ID,
      COS_SECRET_KEY: process.env.COS_SECRET_KEY,
      SERVERURL: process.env.SERVERURL,
    },
  },

  nitro: { output: { dir: process.env.OutputDir } },
  watch: ['./tailwind.config.js'],

  colorMode: {
    preference: 'light',
    classSuffix: '',
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    plugins: [
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      AutoImport({
        imports: ['pinia'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/hooks/**',
          'src/stores',
          'src/constants',
          'src/utils/**',
          'src/layouts',
        ],
        vueTemplate: true,
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
    ],
  },

  compatibilityDate: '2024-10-12',
})
