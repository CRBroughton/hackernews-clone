import { mount } from '@cypress/vue'
import Notification from '@/components/Notification.vue'
import 'virtual:windi.css'

describe('Notification Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders a notification prop message', () => {
    const text = 'An error has occurred'

    mount(Notification, {
      propsData: {
        text,
      },
    })
    cy.get('[data-cy=notification]').contains(text)
  })
  it('renders a spinner when in the loading state', () => {
    const text = 'An error has occurred'

    mount(Notification, {
      propsData: {
        text,
        loader: true,
      },
    })
    cy.get('[data-cy=loader]').should('exist')
  })
  it('doesnt render a spinner when not in the loading state', () => {
    const text = 'An error has occurred'

    mount(Notification, {
      propsData: {
        text,
        loader: false,
      },
    })
    cy.get('[data-cy=loader]').should('not.exist')
  })
})
