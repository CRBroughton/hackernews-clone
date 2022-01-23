<script setup lang="ts">
import { useMutation } from '@urql/vue'
import type { OperationResult } from '@urql/vue'
import { promiseTimeout } from '@vueuse/core'
import { Signup } from '@/graphql/mutations'
import { authStore } from '@/store'

const router = useRouter()
const store = authStore()
const networkResponse = ref()

const signupMutation = useMutation(Signup)

const goToHome = async(result: OperationResult<any, any>) => {
  networkResponse.value = result
  await promiseTimeout(1000)
  router.push('/')
}

const signup = (name: string, email: string, password: string) => {
  const variables = { name, email, password }
  signupMutation.executeMutation(variables).then(async(result) => {
    if (result.error) {
      networkResponse.value = result
      return
    }
    goToHome(result)
  })
}
</script>

<template>
  <div class="flex flex-col gap-1 w-60 p-2">
    <input v-model="store.credentials.username" class="border border-2" type="text" placeholder="username">
    <input v-model="store.credentials.email" class="border border-2" type="text" placeholder="email">
    <input v-model="store.credentials.password" class="border border-2" type="text" placeholder="password">
    <button class="border border-2" @click.prevent="signup(store.credentials.username, store.credentials.email, store.credentials.password)">
      Submit
    </button>
    <div v-if="networkResponse?.data">
      <p>Successfully Signed Up!</p>
    </div>
    <div v-if="networkResponse?.error">
      {{ networkResponse.error }}
    </div>
  </div>
</template>
