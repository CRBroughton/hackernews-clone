/// <reference types="cypress" />

import { useStore } from '@/store/main'
describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('increments the count', () => {
    const counter = useStore()
    expect(counter.count).to.equal(0)
    counter.increment()
    expect(counter.count).to.equal(1)
  })
})
