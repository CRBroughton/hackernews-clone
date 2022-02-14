export const SignupMutation = `
    mutation ($username: String!, $email: String!, $password: String!) {   
    signup (username: $username, email: $email, password: $password) {      
        token 
        user {
            id
        }
    }
    }
`
