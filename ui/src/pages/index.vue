
<script setup lang="ts">
import { useQuery } from 'villus'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { homePage } from '@/graphql/queries'

const result = useQuery(homePage)

const fetching = result.isFetching
const data = result.data
const error = result.error
</script>

<template>
  <DefaultLayout>
    <div v-if="fetching">
      <Notification loader text="Loading..." />
    </div>
    <div v-else-if="error">
      <Notification loader text="Oh no! An error occured!" />
    </div>
    <div v-else-if="!data.feed.length">
      <Notification text="There are no posts!" />
    </div>
    <div v-else class="mt-2">
      <div v-for="post in data.feed" :key="post.id" class="text-white px-2">
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
