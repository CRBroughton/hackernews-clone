// src/mocks/handlers.js
import { graphql } from 'msw'
import { uuidGenerator } from '@/utils/uuidGenerator'

export const handlers = [
  graphql.operation((req, res, ctx) => {
    // const { description } = req.variables
    return res(
      ctx.data({
        feed: [
          {
            id: uuidGenerator(),
            description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
            url: 'nexusjs.org',
            topic: 'General',
            postedBy: {
              name: 'crbroughton',
            },
            voters: [],
            __typename: 'Post',
          },
          {
            id: uuidGenerator(),
            description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
            url: 'nexusjs.org',
            topic: 'General',
            postedBy: {
              name: 'crbrodughton',
            },
            voters: [],
            __typename: 'Post',
          }],
      }),
    )
  }),
  // // Handles a "Login" mutation
  // graphql.mutation('Login', (req, res, ctx) => {
  //   const { username } = req.variables
  //   sessionStorage.setItem('is-authenticated', username)

  //   return res(
  //     ctx.data({
  //       login: {
  //         username,
  //       },
  //     }),
  //   )
  // }),

  // // Handles a "GetUserInfo" query
  // graphql.query('GetUserInfo', (req, res, ctx) => {
  //   const authenticatedUser = sessionStorage.getItem('is-authenticated')

  //   if (!authenticatedUser) {
  //     // When not authenticated, respond with an error
  //     return res(
  //       ctx.errors([
  //         {
  //           message: 'Not authenticated',
  //           errorType: 'AuthenticationError',
  //         },
  //       ]),
  //     )
  //   }

  //   // When authenticated, respond with a query payload
  //   return res(
  //     ctx.data({
  //       user: {
  //         username: authenticatedUser,
  //         firstName: 'John',
  //       },
  //     }),
  //   )
  // }),
]
