import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { defaults } from '@/plugins/defaults'
import * as directives from 'vuetify/directives'

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: { primary: '#5e17eb' }
}
const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // primary: '#4c9173',
    primary: '#5e17eb',
    secondary: '#e3aa98',
    // secondary: '#f7ca9f',
    background: '#EFEFEF',
    white: '#FFFFFF'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: { customDarkTheme, customLightTheme }
  },
  directives,
  defaults,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})
