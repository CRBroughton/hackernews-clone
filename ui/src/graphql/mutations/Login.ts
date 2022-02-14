export const LoginMutation = `
    mutation ($email: String!, $password: String!) {   
    login (email: $email, password: $password) {      
        token 
        user {
            id
        }
    }
    }
`
