/// <reference types="cypress" />

import { authStore } from '@/store/main'
describe('Authentication Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('logs in the user', () => {
    const store = authStore()
    expect(store.loggedIn).equals(false)
    store.logInUser(true)
    expect(store.loggedIn).to.equal(true)
  })
})
