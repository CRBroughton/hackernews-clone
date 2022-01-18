<script setup lang="ts">

interface Props {
  description: string
  url: string
  postedBy: {
    name: string
  }
  voters: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col text-gray-800 pb-2">
    <div class="flex">
      <MdiMenuUp />
      <h1 class="text-sm">
        <a :href="props.url">{{ props.description }}</a> <a :href="props.url" class="hover:underline hover:cursor-pointer">{{ `(${props.url})` }}</a>
      </h1>
    </div>
    <p class="text-xs text-gray-700 ml-1">
      {{ `${props.voters} points` }} {{ `Posted by ${props.postedBy.name}` }}
    </p>
  </div>
</template>

<style scoped>

</style>
