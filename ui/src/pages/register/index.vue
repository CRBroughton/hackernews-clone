<template>
  <div class="flex flex-col gap-1 w-60 p-2">
    <input v-model="data.username" class="border border-2" type="text" placeholder="username">
    <input v-model="data.email" class="border border-2" type="text" placeholder="email">
    <input v-model="data.password" class="border border-2" type="text" placeholder="password">
    <button class="border border-2" @click.prevent="signup(data.username, data.email, data.password)">
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { useMutation } from '@urql/vue'

export default {
  setup() {
    const data = reactive({
      username: '',
      email: '',
      password: '',
    })

    const signup = useMutation(`
      mutation ($name: String!, $email: String!, $password: String!) {   
        signup (name: $name, email: $email, password: $password) {      
          token 
            user {
              id
            }
         }
       }
    `)

    return {
      data,
      signup(name: any, email: any, password: any) {
        const variables = { name, email, password }
        signup.executeMutation(variables)
      },
    }
  },

}

// const signup = (username: string, email: string, password: string) => {
//   useMutation(`
//       mutation signup(name: ${username}, email: ${email}), password: ${password} {
//         token {
//           user {
//             id
//           }
//         }
//       }
//     `)
// }

</script>

<style scoped>

</style>
