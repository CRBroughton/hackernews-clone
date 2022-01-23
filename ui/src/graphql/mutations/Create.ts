export const Create = `
    mutation ($url: String!, $description: String!) {   
        post (url: $url, description: $description) {      
            url
        }
    }
`
