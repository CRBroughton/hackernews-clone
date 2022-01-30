<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { Create } from '@/graphql/mutations'
import { authStore } from '@/store'

const router = useRouter()
const store = authStore()

const createMutation = useMutation(Create)
const networkResponse = ref()

const createPost = (url: string, topic: string, description: string) => {
  const variables = { url, topic, description }

  createMutation.executeMutation(variables).then(async(result) => {
    if (result.error) {
      networkResponse.value = result
      store.logInUser(false)
    }
    else { router.push('/') }
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
      <div v-if="networkResponse?.error">
        <Notification :text="networkResponse.error" />
      </div>
    </div>
  </DefaultLayout>
</template>
