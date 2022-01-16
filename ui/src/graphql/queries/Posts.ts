export const homePage = {
  query: `
          {
              feed {
                  description
                  url
                  postedBy {
                  name
                  }
              }
          }
        `,
}
