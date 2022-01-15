/// <reference types="cypress" />

import { mount } from '@cypress/vue'
import HelloWorld from '@/components/HelloWorld.vue'
import 'virtual:windi.css'

describe('HelloWorld Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders a message', () => {
    const msg = 'test message'
    mount(HelloWorld, {
      propsData: {
        msg,
      },
    })
    cy.get('[data-cy=heading]').contains(msg)
  })
})
