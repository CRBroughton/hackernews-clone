import { authStore } from '../src/store'

describe('Authentication Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('Sets the user to a logged in state', () => {
    const store = authStore()
    expect(store.loggedIn).to.equal(false)
    store.logInUser(true)
    expect(store.loggedIn).to.equal(true)
  })
})
