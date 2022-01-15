import { createApp } from 'vue'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router).use(createPinia()).mount('#app')
