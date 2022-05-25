import request from 'supertest'
import { yogaServer } from '../../src/server'

export const createPost = it('Creates a post', async () => {
  const user = await request(yogaServer).post('/graphql').send({
    query: `
    mutation {
            login(email: "crbroughton@posteo.uk", password: "graphql") {
              token
            }
        }
    `,
  })

  const token = user.body.data.login.token

  const post = await request(yogaServer).post('/graphql')
    .set('authorization', `bearer ${token}`)
    .send({
      query: `
        mutation {
            post(url: "https://google.com", topic: "General", description: "this is a test post") {
                id
                description
                url
                postedBy {
                id
                name
                email
                }
            }
        }
    `,
    })

  expect(post.body.data).toEqual(expect.objectContaining({
    post: expect.objectContaining({
      id: expect.any(String),
      description: 'this is a test post',
      url: 'https://google.com',
    }),
  }))
})
