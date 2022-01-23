<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { Create } from '@/graphql/mutations'
import { authStore } from '@/store'

const router = useRouter()
const store = authStore()

const createMutation = useMutation(Create)
const networkResponse = ref()

const createPost = (url: string, description: string) => {
  const variables = { url, description }

  createMutation.executeMutation(variables).then(async(result) => {
    if (result.error)
      networkResponse.value = result
  })

  router.push('/')
}

</script>

<template>
  <div class="flex flex-col gap-1 w-60 p-2">
    <h1 class="text-3xl mb-4">
      Create Post
    </h1>
    <input v-model="store.createPost.description" class="border border-2" type="text" placeholder="Description">
    <input v-model="store.createPost.url" class="border border-2" type="text" placeholder="URL">
    <button class="border border-2" @click="createPost(store.createPost.url, store.createPost.description)">
      Submit
    </button>
  </div>
</template>

<style scoped>

</style>
