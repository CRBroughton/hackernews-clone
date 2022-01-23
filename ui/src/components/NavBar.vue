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
  <div class="bg-gray-800 py-4 px-6 flex text-white">
    <router-link to="/">
      Hackernews Clone
    </router-link>
    <div v-if="store.loggedIn" class="ml-auto">
      <router-link to="/create" class="mx-2">
        Create Post
      </router-link>
      <button @click="logout">
        Logout
      </button>
    </div>
    <div v-else class="ml-auto">
      <router-link to="/register">
        Register
      </router-link>
      <router-link to="/login" class="mx-2">
        Login
      </router-link>
    </div>
  </div>
</template>
