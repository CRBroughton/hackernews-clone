import { createUser } from './CreateUser'
import { loginUser } from './LoginUser'
import { queryFeed } from './QueryFeed'
import { createPost } from './CreatePost'

const authTests = [createUser, loginUser]
const queryTests = [queryFeed]
const mutationTests = [createPost]

authTests.forEach((test) => {
  test
})

queryTests.forEach((test) => {
  test
})

mutationTests.forEach((test) => {
  test
})
