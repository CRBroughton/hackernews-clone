import request from 'supertest'
import { yogaServer } from '../../src/server'

export const loginUser = it('Logs in a user', async() => {
  const response = await request(yogaServer).post('/graphql').send({
    query: ` {
          login(email: "crbroughton@posteo.uk", password: "graphql") {
            token
            user {
                id
                email
            }
          }
        }`,
  })

  expect(response.body.data).toEqual(expect.objectContaining({
    login: expect.objectContaining({
      user: expect.objectContaining({
        email: 'crbroughton@posteo.uk',
      }),
    }),
  }))
})
