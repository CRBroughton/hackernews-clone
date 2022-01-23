<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { Vote } from '@/graphql/mutations'

interface Props {
  id: string
  description: string
  url: string
  postedBy: {
    name: string
  }
  voters: number
}

const props = defineProps<Props>()

const voteMutation = useMutation(Vote)
const networkResponse = ref()

const voteForPost = (postId: string) => {
  const variables = { postId }
  voteMutation.executeMutation(variables).then(async(result) => {
    if (result.error)
      networkResponse.value = result
  })
}
</script>

<template>
  <div class="flex flex-col my-2 px-2 py-4 text-gray-800 bg-gray-100">
    <div class="flex">
      <MdiMenuUp class="hover:cursor-pointer" @click="voteForPost(props.id)" />
      <h1 class="text-sm">
        <a :href="props.url">{{ props.description }}</a> <a :href="props.url" class="hover:underline hover:cursor-pointer">{{ `(${props.url})` }}</a>
      </h1>
    </div>
    <p class="text-xs text-gray-700 ml-1">
      {{ `${props.voters} points` }} {{ `posted by ${props.postedBy.name}` }}
    </p>
  </div>
</template>
