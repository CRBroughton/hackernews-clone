<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { getTopicPosts } from '@/graphql/queries'

interface Props {
  topic: string
}
const props = defineProps<Props>()

const result = useQuery({
  query: getTopicPosts,
  variables: {
    topic: props.topic,
  },
})

const fetching = result.fetching
const data = result.data
const error = result.error
</script>

<template>
  <DefaultLayout>
    <h1 class="text-3xl p-2">
      welcome to {{ props.topic }}
    </h1>
    <div v-if="fetching">
      <Notification loader text="Loading..." />
    </div>
    <div v-else-if="error">
      <Notification loader text="Oh no! An error occured!" />
    </div>
    <div v-else-if="!data.getTopicPosts.length">
      <Notification text="There are no posts!" />
    </div>
    <div v-else class="mt-2">
      <div v-for="post in data.getTopicPosts" :key="post.id" class="text-white px-2">
        <Post
          :id="post.id"
          :description="post.description"
          :url="post.url"
          :topic="post.topic"
          :posted-by="post.postedBy"
          :voters="post.voters"
          :vote-count="post.voters.length"
        />
      </div>
    </div>
  </DefaultLayout>
</template>
