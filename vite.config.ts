import { fileURLToPath, URL } from 'node:url'
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true })],

  build: {
    lib: {
      entry: [path.resolve(__dirname, 'src/index.ts')],
      name: 'SchematixCustomPage',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        'vuetify',
        'vuetify/components/VCard',
        'vuetify/components/VImg',
        'vuetify/components/VIcon',
        'vuetify/components/VDialog',
        'vuetify/components/VBtn',
        'vuetify/components/VApp',
        'vuetify/components/VAppBar',
        'vuetify/components/VThemeProvider',
        'vuetify/components/VNavigationDrawer',
        'vuetify/components/VList',
        'vuetify/components/VGrid',
        'vuetify/components/VMain',
        'vuetify/components/VCarousel',
        'vuetify/components/VExpansionPanel',
        'vuetify/components/VSelect',
        'vuetify/components/VTextField',
        'vuetify/components/VCheckbox',
        'vuetify/components/VFooter'
      ],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'vuetify'
        }
      }
    },
    minify: false,
    target: 'esnext',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8082,
    open: true
  }
})
