import { mount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import 'virtual:windi.css'

describe('Notification Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders a notification prop message', () => {
    const text = 'An error has occurred'

    const wrapper = mount(Notification, {
      props: {
        text,
      },
    })

    const notification = wrapper.get('[data-cy=notification]')

    expect(notification.text()).toContain(text)
  })
  it('renders a spinner when in the loading state', () => {
    const text = 'Loading...'

    const wrapper = mount(Notification, {
      props: {
        text,
        loader: true,
      },
    })
    expect(wrapper.find('[data-cy=loader]').exists()).toBe(true)
  })
  it('doesnt render a spinner when not in the loading state', () => {
    const text = 'Finished Loading!'

    const wrapper = mount(Notification, {
      props: {
        text,
        loader: false,
      },
    })
    expect(wrapper.find('[data-cy=loader]').exists()).toBe(false)
  })
})
