import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import install from '@/install'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

app.use(vuetify).use(install).mount('#app')
