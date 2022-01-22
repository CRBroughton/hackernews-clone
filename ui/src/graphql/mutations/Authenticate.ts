export const Authenticate = `
mutation ($cookie: String!) {   
    authenticate (cookie: $cookie) {      
        token 
    }
}
`
