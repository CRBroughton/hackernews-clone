<template>
  <div class="flex flex-col gap-1 w-60 p-2">
    <input v-model="data.username" class="border border-2" type="text" placeholder="username">
    <input v-model="data.email" class="border border-2" type="text" placeholder="email">
    <input v-model="data.password" class="border border-2" type="text" placeholder="password">
    <button class="border border-2">
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">

const data = reactive({
  username: '',
  email: '',
  password: '',
})

</script>

<style scoped>

</style>
