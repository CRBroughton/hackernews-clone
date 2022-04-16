<script setup lang="ts">
import { authStore } from '@/store'

const store = authStore()

const loggedIn = computed(() => {
  return store.loggedIn
})
</script>

<template>
  <div>
    <NavBar :logged-in="loggedIn" />
    <slot />
  </div>
</template>
