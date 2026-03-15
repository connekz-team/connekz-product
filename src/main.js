import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import './style.css'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const head = createHead()

createApp(App).use(vuetify).use(head).mount('#app')
