<script setup lang="ts">
import { useStore } from '@/store'

interface Props {
  msg: string
}

// For default values for your props, use :
// withDefaults(defineProps<Props>(), { msg: 'myDefaultValue' })

defineProps<Props>()

const store = useStore()
const { count } = storeToRefs(store)
</script>

<template>
  <h1 data-cy="heading" text="3xl" m="y-5">
    {{ msg }}
  </h1>

  <p>See <code>README.md</code> for more information.</p>

  <p m="b-5">
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="store.increment">
    count is: {{ count }}
  </button>
  <p m="b-5">
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
