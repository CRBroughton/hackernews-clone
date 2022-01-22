
<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { useCookie } from 'vue-cookie-next'
import { Authenticate } from '@/graphql/mutations'
import { authStore } from '@/store'

const cookie = useCookie()
const store = authStore()
const storedCookie = cookie.getCookie('bearer')

const authenticateUser = async() => {
  const authenticateMutation = useMutation(Authenticate)
  await authenticateMutation.executeMutation(storedCookie)

  // TODO Must delete local cookie if back end does not find user

  store.logInUser(true)
}

onMounted(() => {
  if (!storedCookie) return
  authenticateUser()
})
</script>

<template>
  <div class="p-4 bg-gray-200">
    <NavBar />
    <Posts />
  </div>
</template>

<style lang="scss">
.flex-div {
  @apply flex flex-col pt-15;
}
</style>
