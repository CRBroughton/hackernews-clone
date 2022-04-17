<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useMutation } from 'villus'
import type { Signup } from '@/Types'
import { SignupMutation } from '@/graphql/mutations'

const router = useRouter()
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
    <AuthenticationForm
      username
      username-msg="What would you like your username to be?"
      email-msg="What email should we use?"
      password-msg="What password should we use?"
      :execute="signup"
    />
    <div class="flex justify-center">
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
