<template>
  <div v-if="fetching">
    Loading...
  </div>
  <div v-else-if="error">
    Oh no... {{ error }}
  </div>
  <div v-else>
    <div v-for="post in data.feed" :key="post.id" class="text-white">
      <Post :description="post.description" :url="post.url" :posted-by="post.postedBy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { homePage } from '@/queries'
const result = useQuery(homePage)

const fetching = result.fetching
const data = result.data
const error = result.error

</script>

<style scoped>

</style>
