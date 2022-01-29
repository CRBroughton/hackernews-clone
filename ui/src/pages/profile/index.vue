<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { getUserPosts } from '@/graphql/queries'

const result = useQuery(getUserPosts)

const fetching = result.fetching
const data = result.data
const error = result.error
</script>

<template>
  <DefaultLayout>
    <h1 class="text-3xl p-2">
      Your Posts
    </h1>
    <div v-if="fetching">
      <Notification loader text="Loading..." />
    </div>
    <div v-else-if="error">
      <Notification loader text="Oh no! An error occured!" />
    </div>
    <div v-else-if="!data.getUserPosts.length">
      <Notification text="There are not posts!" />
    </div>
    <div v-else class="mt-2">
      <div v-for="post in data.getUserPosts" :key="post.id" class="text-white px-2">
        <Post :id="post.id" :description="post.description" :url="post.url" :posted-by="post.postedBy" :vote-count="post.voters.length" />
      </div>
    </div>
  </DefaultLayout>
</template>
