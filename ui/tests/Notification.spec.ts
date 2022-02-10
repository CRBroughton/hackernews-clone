import { mount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import 'virtual:windi.css'

const boostrap = (text: string, loader: boolean) => {
  return mount(Notification, {
    props: {
      text,
      loader,
    },
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Notification Component', () => {
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

    const wrapper = boostrap(text, true)

    expect(wrapper.find('[data-cy=loader]').exists()).toBe(true)
  })
  it('doesnt render a spinner when not in the loading state', () => {
    const text = 'Finished Loading!'

    const wrapper = boostrap(text, false)

    expect(wrapper.find('[data-cy=loader]').exists()).toBe(false)
  })
})
