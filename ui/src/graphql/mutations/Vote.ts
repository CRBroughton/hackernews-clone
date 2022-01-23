export const Vote = `
    mutation ($postId: String!) {   
        vote (postId: $postId) {      
            post {
                id
              }
        }
    }
`
