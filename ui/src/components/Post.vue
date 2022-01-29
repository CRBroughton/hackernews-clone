<script setup lang="ts">
import { useMutation, useQuery } from '@urql/vue'
import { Vote } from '@/graphql/mutations'
import { UserId } from '@/graphql/queries'
import { authStore } from '@/store'

interface Props {
  id: string
  description: string
  url: string
  postedBy?: {
    id: string
    name: string
  }
  voters?: Array<{id: string}>
  voteCount: number
}

const props = defineProps<Props>()
const store = authStore()

const voteMutation = useMutation(Vote)

const networkResponse = ref()
const userVoted = ref()
const owner = ref()

const username = props.postedBy?.name ? props.postedBy?.name : 'unknown user'

const showUpvote = computed(() => {
  return owner.value !== props.postedBy?.id && store.loggedIn
})

useQuery(UserId).then((result) => {
  if (result.data.value) {
    owner.value = result.data.value.getUserId
    if (props.voters?.some(i => i.id.includes(result.data.value.getUserId)))
      userVoted.value = true
    else userVoted.value = false
  }
})

const voteForPost = (postId: string) => {
  const variables = { postId }
  voteMutation.executeMutation(variables).then(async(result) => {
    if (result.error)
      networkResponse.value = result
  })
}
</script>

<template>
  <div class="flex my-2 px-2 py-4 text-gray-800 bg-gray-100 items-center">
    <MdiMenuUp
      v-if="showUpvote"
      class="hover:cursor-pointer"
      :class="{ 'text-orange-500': userVoted }"
      @click="voteForPost(props.id)"
    />
    <div :class="{ 'ml-5': !showUpvote } ">
      <h1 class="text-sm">
        <a :href="props.url">{{ props.description }}</a>
        <a :href="props.url" class="hover:underline hover:cursor-pointer">{{ ` (${ props.url })` }}</a>
      </h1>
      <p class="text-xs text-gray-700">
        {{ `${ props.voteCount } points` }} {{ `posted by ${ username } ` }}
      </p>
    </div>
  </div>
</template>
