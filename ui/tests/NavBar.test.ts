import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { authStore } from '@/store/main'
import NavBar from '@/components/NavBar.vue'
import 'virtual:windi.css'

vi.mock('@/store/main', () => ({
  __esModule: true,
  authStore() {
    return {
      loggedIn: false,

      logInUser(value: boolean) {
        this.loggedIn = value
      },
    }
  },
}))

const bootstrap = () => {
  return mount(NavBar, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  })
}

const store = authStore() // uses the testing pinia!

describe('NavBar Component', () => {
  it('renders the register and login links when logged out', async() => {
    const wrapper = bootstrap()

    const loginLink = wrapper.get('[data-test=login]')
    expect(loginLink.text()).toContain('Login')

    const registerLink = wrapper.get('[data-test=register]')
    expect(registerLink.text()).toContain('Register')
  })
  it('renders the profile, create post and logout links when logged in', () => {
    store.logInUser(true)
    const wrapper = bootstrap()

    const profileLink = wrapper.get('[data-test=profile]')
    expect(profileLink.text()).toContain('Profile')

    const createLink = wrapper.get('[data-test=create]')
    expect(createLink.text()).toContain('Create Post')

    const logoutLink = wrapper.get('[data-test=logout]')
    expect(logoutLink.text()).toContain('Logout')
  })
})
