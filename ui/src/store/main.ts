
export const authStore = defineStore('main', {
  state: () => {
    return {
      loggedIn: false,
      userId: '',
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
