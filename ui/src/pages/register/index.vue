<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
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

const { execute } = useMutation(SignupMutation)

const signup = async(signup: Signup) => {
  const variables = { ...signup }

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
    <div class="flex justify-center">
      <div class="w-full sm:(w-96) mx-5 mt-10">
        <FormKit
          v-slot="{ state: { valid } }"
          v-model="store.credentials"
          type="form"
          :actions="false"
          submit-label="Register"
          @submit="signup(store.credentials)"
        >
          <FormKit
            type="text"
            name="name"
            label="Username"
            placeholder="Jane Doe"
            help="What would you like your username to be?"
            validation="required"
          />
          <FormKit
            type="text"
            name="email"
            label="Your email"
            placeholder="jane@example.com"
            help="What email should we use?"
            validation="required|email"
          />
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required|length:8|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            help="Choose an account password"
          />
          <FormKit type="submit" :disabled="!valid" />
          <pre wrap>Form validity: {{ valid }}</pre>
        </FormKit>
      </div>
      <div class="flex flex-col fixed bottom-0 right-0">
        <div v-if="networkResponse?.data">
          <Notification text="Successfully Signed Up!" />
        </div>
        <div v-if="networkResponse?.error">
          <Notification :text="networkResponse.error" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
