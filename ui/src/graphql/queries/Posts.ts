export const homePage = {
  query: `
          {
              feed {
                  id
                  description
                  url
                  postedBy {
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
              name
              }
              voters {
                id
              }
            } 
          }
        `,
}
