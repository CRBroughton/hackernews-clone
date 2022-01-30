<script setup lang="ts">

interface Props {
  text: string | object
  loader?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div class="bg-gray-100 fixed right-0 bottom-0 m-2 p-4 rounded flex items-center">
    <h1 :class="{ 'mr-4': props.loader }">
      {{ props.text }}
    </h1>
    <mdi-loading v-if="props.loader" class="h-8 w-8 animate-spin" />
  </div>
</template>
