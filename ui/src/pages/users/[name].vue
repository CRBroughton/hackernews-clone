<script setup lang="ts">

interface Props {
  name: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <h1 text="white">
      Welcome to your dynamic page {{ props.name }}
    </h1>
  </div>
</template>
