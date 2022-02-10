import { config, mount } from '@vue/test-utils'
import { VILLUS_CLIENT, createClient } from 'villus'
// import { createTestingPinia } from '@pinia/testing'
import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { routes } from '@/mocks/routes'
import Post from '@/components/Post.vue'
import 'virtual:windi.css'

config.plugins.VueWrapper.install(VueRouterMock)

const router = createRouterMock({ routes })

const bootstrap = () => {
  return mount(Post, {
    props: {
      id: 'test',
      description: 'tests',
      url: 'http://google.com',
      topic: 'http://google.com',
      voteCount: 1,

    },
    global: {
      provide: {
        [VILLUS_CLIENT as any]: createClient({
          url: 'http://localhost:3000',
        }),
      },
      plugins: [useRouter],
      // plugins: [useRouter(), createTestingPinia()],

    },
  })
}

describe('Notification Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    injectRouterMock(router)
  })
  it('renders a notification prop message', () => {
    const wrapper = bootstrap()

    const notification = wrapper.get('[data-test=description]')

    expect(notification.text()).toContain('tests')
  })
})
