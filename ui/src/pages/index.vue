
<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { useCookie } from 'vue-cookie-next'
import { Authenticate } from '@/graphql/mutations'
import { authStore } from '@/store'
import DefaultLayout from '@/components/DefaultLayout.vue'

const cookie = useCookie()
const store = authStore()
const storedCookie = cookie.getCookie('Authorization')

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
  <DefaultLayout>
    <NavBar />
    <Posts />
  </DefaultLayout>
</template>
