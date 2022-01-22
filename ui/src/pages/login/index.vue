<script setup lang="ts">
import type { OperationResult } from '@urql/vue'
import { useMutation } from '@urql/vue'
import { useCookie } from 'vue-cookie-next'
import { promiseTimeout } from '@vueuse/core'
import { Login } from '@/graphql/mutations'
import { authStore } from '@/store'

const cookie = useCookie()
const router = useRouter()
const store = authStore()

const networkResponse = ref()

const loginMutation = useMutation(Login)

const goToHome = async(result: OperationResult<any, any>) => {
  networkResponse.value = result
  await promiseTimeout(1000)
  router.push('/')
}

const login = (email: string, password: string) => {
  const variables = { email, password }
  loginMutation.executeMutation(variables).then(async(result) => {
    if (result.error) {
      networkResponse.value = result
      return
    }

    cookie.setCookie('bearer', result.data.login.token, { expire: '7d', secure: 'true', sameSite: 'strict' })
    store.logInUser(true)
    goToHome(result)
  })
}
</script>

<template>
  <div class="flex flex-col gap-1 w-60 p-2">
    <input v-model="store.credentials.email" class="border border-2" type="text" placeholder="email">
    <input v-model="store.credentials.password" class="border border-2" type="text" placeholder="password">
    <button class="border border-2" @click.prevent="login(store.credentials.email, store.credentials.password)">
      Submit
    </button>
    <div v-if="networkResponse?.data">
      <p>Successfully Logged In!</p>
    </div>
    <div v-if="networkResponse?.error">
      {{ networkResponse.error }}
    </div>
  </div>
</template>

<style scoped>

</style>
