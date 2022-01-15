// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
    }
  },
  // optional actions
  actions: {
    increment() {
      // `this` is the store instance
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
