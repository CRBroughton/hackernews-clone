
export const authStore = defineStore('main', {
  state: () => {
    return {
      loggedIn: false,
      credentials: reactive({
        username: '',
        email: '',
        password: '',
      }),
    }
  },
  actions: {
    logInUser(value: boolean) {
      this.loggedIn = value
    },
  },
})
