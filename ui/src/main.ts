import { createApp } from 'vue'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import type { ClientPluginContext } from 'villus'
import { createClient, defaultPlugins } from 'villus'
import { defaultConfig, plugin } from '@formkit/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'
import routes from '~pages'

import '@formkit/themes/genesis/theme.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function authPlugin({ opContext }: ClientPluginContext) {
  let storedCookie: string
  if (!VueCookieNext.getCookie('Authorization'))
    storedCookie = ''
  else
    storedCookie = VueCookieNext.getCookie('Authorization')

  opContext.headers.Authorization = storedCookie
}

const client = createClient({
  url: 'http://localhost:3000',
  use: [authPlugin, ...defaultPlugins()],
})

app
  .use(router)
  .use(VueCookieNext)
  .use(createPinia())
  .use(client)
  .use(plugin, defaultConfig)
  .mount('#app')
