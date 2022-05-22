import request from 'supertest'
import { yogaServer } from '../../src/server'

export const createUser = it('Creates a user', async() => {
  const response = await request(yogaServer).post('/graphql').send({
    query: ` 
        mutation {
          signup(name: "crbroughton", email: "crbroughton@posteo.uk", password: "graphql") {
            token
            user {
              id
                    email
            }
          }
        }`,
  })

  expect(response.body.data).toEqual(expect.objectContaining({
    signup: expect.objectContaining({
      user: expect.objectContaining({
        email: 'crbroughton@posteo.uk',
      }),
    }),
  }))
})
