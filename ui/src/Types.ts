export interface Signup {
  name: string
  email: string
  password: string
}

export interface Login {
  email: string
  password: string
}

export interface Post {
  url: string
  topic: string
  description: string
}
