
export const authStore = defineStore('main', {
  state: () => {
    return {
      loggedIn: false,
      userId: '',
      credentials: reactive({
        name: '',
        email: '',
        password: '',
      }),
      createPost: reactive({
        url: '',
        topic: '',
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
