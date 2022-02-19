
<script setup lang="ts">
import { authStore } from '@/store'

const store = authStore()

interface Props {
  usernameMsg?: string
  username?: boolean
  emailMsg: string
  passwordMsg: string
  execute?: Function
}

const props = defineProps<Props>()
</script>

<template>
  <div class="w-full sm:(w-96) px-5 mt-10 ">
    <FormKit
      v-slot="{ state: { valid } }"
      v-model="store.credentials"
      type="form"
      :actions="false"
      submit-label="Register"
      @submit="props.execute!(store.credentials)"
    >
      <FormKit
        v-if="props.username"
        type="text"
        name="name"
        label="Username"
        placeholder="Jane Doe"
        :help="props.usernameMsg"
        validation="required"
      />
      <FormKit
        type="text"
        name="email"
        label="Your email"
        placeholder="jane@example.com"
        :help="props.emailMsg"
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
        :help="props.passwordMsg"
      />
      <FormKit type="submit" :disabled="!valid" />
    </FormKit>
  </div>
</template>
