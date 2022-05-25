<script setup lang="ts">
import { useMutation } from 'villus'
import { Create } from '@/graphql/mutations'
import type { Post } from '@/Types'

const router = useRouter()

const { execute } = useMutation(Create)
const networkResponse = ref()

const createPost = async ({ ...Post }: Post) => {
  const variables = Post

  execute(variables).then(async (result) => {
    if (result.error)
      networkResponse.value = result

    else router.push('/')
  })
}
</script>

<template>
  <DefaultLayout>
    <h1 class="text-3xl mb-4">
      Create Post
    </h1>
    <CreateForm :execute="createPost" />
    <div class="flex flex-col gap-1 w-60 p-2">
      <div class="flex flex-col fixed bottom-0 right-0">
        <div v-if="networkResponse?.error">
          <Notification :text="networkResponse.error.toString().slice(9)" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
