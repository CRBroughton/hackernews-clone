
export const authStore = defineStore('main', {
  state: () => {
    return {
      loggedIn: false,
      credentials: reactive({
        username: '',
        email: '',
        password: '',
      }),
      createPost: reactive({
        url: '',
        description: '',
      }),
    }
  },
  actions: {
    logInUser(value: boolean) {
      this.loggedIn = value
    },
  },
})
