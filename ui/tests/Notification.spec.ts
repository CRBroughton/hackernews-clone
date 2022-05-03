import { mount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import 'virtual:windi.css'

interface Props {
  text: string
  loader?: boolean
}

const bootstrap = (props: Props) => {
  return mount(Notification, {
    props: { ...props },
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Notification Component', () => {
  it('renders a notification prop message', () => {
    const text = 'An error has occurred'
    const loader = false

    const wrapper = bootstrap({ text, loader })

    const notification = wrapper.get('[data-test=notification]')

    expect(notification.text()).toContain(text)
  })
  it('renders a spinner when in the loading state', () => {
    const text = 'Loading...'
    const loader = true

    const wrapper = bootstrap({ text, loader })

    expect(wrapper.find('[data-test=loader]').exists()).toBe(true)
  })
  it('doesnt render a spinner when not in the loading state', () => {
    const text = 'Finished Loading!'
    const loader = false

    const wrapper = bootstrap({ text, loader })

    expect(wrapper.find('[data-test=loader]').exists()).toBe(false)
  })
})
