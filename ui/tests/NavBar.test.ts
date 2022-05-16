import { mount } from '@vue/test-utils'
import { useCookie } from 'vue-cookie-next'
import NavBar from '@/components/NavBar.vue'
import 'virtual:windi.css'

interface Props {
  loggedIn: boolean
}

const cookie = useCookie()

const bootstrap = (props: Props) => {
  return mount(NavBar, {
    props: { ...props },
    global: {
      provide: {
        cookie,
      },
    },
  })
}

describe('NavBar Component', () => {
  it('renders the register and login links when logged out', async() => {
    const loggedIn = false
    const wrapper = bootstrap({ loggedIn })

    const loginLink = wrapper.get('[data-test=login]')
    expect(loginLink.text()).toContain('Login')

    const registerLink = wrapper.get('[data-test=register]')
    expect(registerLink.text()).toContain('Register')
  })
  it('renders the profile, create post and logout links when logged in', () => {
    const loggedIn = true

    const wrapper = bootstrap({ loggedIn })

    const profileLink = wrapper.get('[data-test=profile]')
    expect(profileLink.text()).toContain('Profile')

    const createLink = wrapper.get('[data-test=create]')
    expect(createLink.text()).toContain('Create Post')

    const logoutLink = wrapper.get('[data-test=logout]')
    expect(logoutLink.text()).toContain('Logout')
  })
})
