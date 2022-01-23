<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'
import { authStore } from '@/store'

const store = authStore()
const cookie = useCookie()

const logout = () => {
  cookie.removeCookie('Authorization')
  location.reload()
}
</script>

<template>
  <div class="bg-orange-600 py-1 px-2 flex">
    <p class="text-gray-900">
      Hackernews Clone
    </p>
    <div v-if="store.loggedIn" class="ml-auto">
      <router-link to="/create" class="text-gray-900 ml-2">
        Create Post
      </router-link>
      <button class="ml-2" @click="logout">
        Logout
      </button>
    </div>
    <div v-else class="ml-auto">
      <router-link to="/login" class="text-gray-900 ml-2">
        Login
      </router-link>
      <router-link to="/register" class="text-gray-900 ml-2">
        Register
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
