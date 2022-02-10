import { authStore } from '../src/store'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('increments the count', () => {
    const store = authStore()
    expect(store.loggedIn).to.equal(false)
    store.logInUser(true)
    expect(store.loggedIn).to.equal(true)
  })
})
