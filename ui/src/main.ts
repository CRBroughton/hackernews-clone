import { createApp } from 'vue'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import urql from '@urql/vue'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'
import routes from '~pages'
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

let storedCookie

if (!VueCookieNext.getCookie('Authorization'))
  storedCookie = ''
else
  storedCookie = VueCookieNext.getCookie('Authorization')

app.use(router).use(VueCookieNext).use(createPinia()).use(urql, {
  url: 'http://localhost:3000',
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
      'Authorization': storedCookie,
    },
  },
}).mount('#app')
