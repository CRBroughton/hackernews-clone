import { mount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import 'virtual:windi.css'

const bootstrap = () => {
  return mount(Notification, {
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('MobileMenu Component', () => {
  it('renders', () => {
    const wrapper = bootstrap()

    expect(wrapper).toBe(true)
  })
})
