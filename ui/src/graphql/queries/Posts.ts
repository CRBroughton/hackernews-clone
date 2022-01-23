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
