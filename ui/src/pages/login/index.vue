<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'
import { promiseTimeout } from '@vueuse/core'
import type { CombinedError } from 'villus'
import { useMutation } from 'villus'
import { LoginMutation } from '@/graphql/mutations'
import { authStore } from '@/store'
import type { Login } from '@/Types'

const cookie = useCookie()
const router = useRouter()
const store = authStore()

const networkResponse = ref()

const goToHome = async (result: { data: any; error: CombinedError }) => {
  networkResponse.value = result
  await promiseTimeout(1000)
  await router.push('/')
  location.reload()
}

const { execute } = useMutation(LoginMutation)

const login = async (login: Login) => {
  const variables = { ...login }

  execute(variables).then(async (result) => {
    if (result.error) {
      networkResponse.value = result
      return
    }

    cookie.setCookie('Authorization', result.data.login.token, { expire: '7d', secure: 'true', sameSite: 'strict' })
    store.logInUser(true)
    store.userId = result.data?.login.user.id
    goToHome(result)
  })
}
</script>

<template>
  <DefaultLayout>
    <AuthenticationForm
      email-msg="What is your email?"
      password-msg="What is your password?"
      :execute="login"
    />
    <div class="flex justify-center">
      <div class="flex flex-col fixed bottom-0 right-0">
        <div v-if="networkResponse?.data">
          <Notification text="Successfully logged in!" />
        </div>
        <div v-if="networkResponse?.error">
          <Notification :text="networkResponse.error" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
