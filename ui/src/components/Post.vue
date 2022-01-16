<template>
  <div class="flex flex-col text-gray-800 pb-2">
    <h1 class="text-sm">
      {{ props.description }} <a :href="props.url" class="hover:underline hover:cursor-pointer">{{ `(${props.url})` }}</a>
    </h1>
    <p class="text-xs text-gray-700">
      {{ `Posted by ${props.postedBy.name}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  description: string
  url: string
  postedBy: {
    name: string
  }
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>
