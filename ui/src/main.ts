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

app.use(router).use(VueCookieNext).use(createPinia()).use(urql, {
  url: 'http://localhost:3000',
}).mount('#app')
