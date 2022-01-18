<script setup lang="ts">
import { useMutation } from '@urql/vue'
import type { OperationResult } from '@urql/vue'
import { promiseTimeout } from '@vueuse/core'
import { Signup } from '@/graphql/mutations'

const router = useRouter()

const data = reactive({
  username: '',
  email: '',
  password: '',
})

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
    <input v-model="data.username" class="border border-2" type="text" placeholder="username">
    <input v-model="data.email" class="border border-2" type="text" placeholder="email">
    <input v-model="data.password" class="border border-2" type="text" placeholder="password">
    <button class="border border-2" @click.prevent="signup(data.username, data.email, data.password)">
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

<style scoped>

</style>
