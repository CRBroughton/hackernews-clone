
<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'
import { authStore } from '@/store'

onMounted(() => {
  const cookie = useCookie()
  const store = authStore()
  const storedCookie = cookie.getCookie('Authorization')
  if (!storedCookie) return
  store.logInUser(true)
})

</script>

<template>
  <router-view class="h-screen w-screen" />
</template>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
