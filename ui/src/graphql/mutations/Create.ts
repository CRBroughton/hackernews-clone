export const Create = `
    mutation ($url: String!, $topic: String! $description: String!) {   
        post (url: $url, topic: $topic, description: $description) {      
            url
        }
    }
`
