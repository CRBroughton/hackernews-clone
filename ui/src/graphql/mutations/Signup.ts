export const SignupMutation = `
    mutation ($name: String!, $email: String!, $password: String!) {   
    signup (name: $name, email: $email, password: $password) {      
        token 
        user {
            id
        }
    }
    }
`
