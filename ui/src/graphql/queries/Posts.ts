export const homePage = {
  query: `
          {
              feed {
                  id
                  description
                  url
                  topic
                  postedBy {
                  id
                  name
                  }
                  voters {
                    id
                  }
              }
          }
        `,
}

export const getUserPosts = {
  query: `
          {
            getUserPosts {
              id
              description
              url
              postedBy {
              id
              name
              }
              voters {
                id
              }
            } 
          }
        `,
}
