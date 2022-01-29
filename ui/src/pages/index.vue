
<script setup lang="ts">
import { useQuery } from '@urql/vue'
import DefaultLayout from '@/components/DefaultLayout.vue'
import { homePage } from '@/graphql/queries'

const result = useQuery(homePage)

const fetching = result.fetching
const data = result.data
const error = result.error
</script>

<template>
  <DefaultLayout>
    <div v-if="fetching" class="mt-2">
      Loading...
    </div>
    <div v-else-if="error">
      Oh no... {{ error }}
    </div>
    <div v-else-if="!data.feed.length" class="mt-2">
      There are no posts!
    </div>
    <div v-else class="mt-2">
      <div v-for="post in data.feed" :key="post.id" class="text-white px-2">
        <Post :id="post.id" :description="post.description" :url="post.url" :posted-by="post.postedBy" :voters="post.voters" :vote-count="post.voters.length" />
      </div>
    </div>
  </DefaultLayout>
</template>
