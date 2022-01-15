
<script setup lang="ts">
const router = useRouter()
const name = ref('')

const go = () => {
  if (name.value) router.push(`/users/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div
    class="flex-div"
    text="white"
    font="bold"
  >
    <img alt="Vue logo" src="@/assets/logo.png" class="vue-logo w-32">
    <HelloWorld msg="My Vite Template" />
    <router-link class="font-bold" to="/about">
      Go to the about page
    </router-link>
    <input
      v-model="name"
      w="70"
      text="center"
      bg="gray-800"
      type="text"
      placeholder="Enter text here to go to a dynamic page"
      @keydown.enter="go"
    >
  </div>
</template>

<style lang="scss">
.flex-div {
  @apply flex flex-col items-center pt-15;
}
</style>
