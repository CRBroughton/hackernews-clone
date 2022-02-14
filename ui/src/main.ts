import { createApp } from 'vue'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import type { ClientPluginContext } from 'villus'
import { createClient, defaultPlugins } from 'villus'
import { createRouter, createWebHistory } from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'
import routes from '~pages'

const app = createApp(App)

const boot = async() => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let storedCookie: string

if (!VueCookieNext.getCookie('Authorization'))
  storedCookie = ''
else
  storedCookie = VueCookieNext.getCookie('Authorization')

function authPlugin({ opContext }: ClientPluginContext) {
  opContext.headers.Authorization = storedCookie
}

const client = createClient({
  url: 'http://localhost:3000',
  use: [authPlugin, ...defaultPlugins()],
})

boot().then(() => {
  app.use(router).use(VueCookieNext).use(createPinia()).use(client).mount('#app')
})
