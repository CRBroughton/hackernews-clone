<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { required, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { Create } from '@/graphql/mutations'
import { authStore } from '@/store'
const router = useRouter()
const store = authStore()

const createMutation = useMutation(Create)
const networkResponse = ref()

const rules = {
  createPost: {
    url: { required, url },
    topic: { required },
    description: { required },
  },
}

const v$ = useVuelidate(rules, store)

const errors = computed (() => {
  networkResponse.value = ''
  return v$.value.$errors
})

const createPost = async(url: string, topic: string, description: string) => {
  const variables = { url, topic, description }

  const isFormCorrect = await v$.value.$validate()

  if (!isFormCorrect) return

  createMutation.executeMutation(variables).then(async(result) => {
    if (result.error)
      networkResponse.value = result

    else router.push('/')
  })
}

</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col gap-1 w-60 p-2">
      <h1 class="text-3xl mb-4">
        Create Post
      </h1>
      <input v-model="store.createPost.description" class="border border-2" type="text" placeholder="Description">
      <input v-model="store.createPost.topic" class="border border-2" type="text" placeholder="Topic">
      <input v-model="store.createPost.url" class="border border-2" type="text" placeholder="URL">

      <button class="border border-2" @click="createPost(store.createPost.url, store.createPost.topic, store.createPost.description)">
        Submit
      </button>
      <div class="flex flex-col fixed bottom-0 right-0">
        <div v-if="networkResponse?.error">
          <Notification :text="networkResponse.error.toString().slice(9)" />
        </div>
        <div v-for="error in errors" :key="error.$uid">
          <Notification :text="`${error.$property} - ${error.$message.toString().toLowerCase()}`" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
