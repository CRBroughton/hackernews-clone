<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useMutation } from 'villus'
import type { Signup } from '@/Types'
import { SignupMutation } from '@/graphql/mutations'
import { authStore } from '@/store'

const router = useRouter()
const store = authStore()
const networkResponse = ref()

const goToHome = async(result: any) => {
  networkResponse.value = result
  await promiseTimeout(1000)
  router.push('/')
}

const rules = {
  credentials: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
}

const v$ = useVuelidate(rules, store)

const errors = computed (() => {
  networkResponse.value = ''
  return v$.value.$errors
})

const { execute } = useMutation(SignupMutation)

const signup = async(signup: Signup) => {
  const isFormCorrect = await v$.value.$validate()

  const variables = { ...signup }

  if (!isFormCorrect) return

  execute(variables).then(async(result) => {
    if (result.error) {
      networkResponse.value = result
      return
    }
    goToHome(result)
  })
}
</script>
<template>
  <DefaultLayout>
    <div class="flex flex-col gap-1 w-60 p-2">
      <input v-model="store.credentials.name" class="border border-2" type="text" placeholder="username">
      <input v-model="store.credentials.email" class="border border-2" type="text" placeholder="email">
      <input v-model="store.credentials.password" class="border border-2" type="text" placeholder="password">
      <button class="border border-2" @click.prevent="signup(store.credentials)">
        Submit
      </button>
      <div class="flex flex-col fixed bottom-0 right-0">
        <div v-if="networkResponse?.data">
          <Notification text="Successfully Signed Up!" />
        </div>
        <div v-if="networkResponse?.error">
          <Notification :text="networkResponse.error" />
        </div>
        <div v-for="error in errors" :key="error.$uid">
          <Notification :text="`${error.$property} ${error.$message.toString().slice(5)}`" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
