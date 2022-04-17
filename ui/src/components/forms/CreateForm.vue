
<script setup lang="ts">
import { authStore } from '@/store'

const store = authStore()

interface Props {
  execute?: Function
}

const props = defineProps<Props>()
</script>

<template>
  <div class="w-full sm:(w-96) px-5 mt-10 ">
    <FormKit
      v-slot="{ state: { valid } }"
      v-model="store.createPost"
      type="form"
      :actions="false"
      submit-label="Register"
      @submit="props.execute!(store.createPost)"
    >
      <FormKit
        type="text"
        name="description"
        label="Description"
        placeholder="Description"
        help="The description of your post"
        validation="required"
      />
      <FormKit
        type="text"
        name="topic"
        label="Topic"
        placeholder="Topic"
        help="The topic channel for your post"
        validation="required"
      />
      <FormKit
        type="url"
        name="url"
        label="URL"
        validation="required|url"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="URL"
        help="The URL for your post"
      />
      <FormKit type="submit" :disabled="!valid" />
    </FormKit>
  </div>
</template>
