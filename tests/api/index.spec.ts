import { createUser } from './CreateUser'
import { loginUser } from './LoginUser'
import { queryFeed } from './QueryFeed'
import { createPost } from './CreatePost'
import { getUserPosts } from './GetUserPosts'

const authTests = [createUser, loginUser]
const queryTests = [queryFeed]
const mutationTests = [createPost]
const postMutationTests = [getUserPosts]

authTests.forEach((test) => {
  test
})

queryTests.forEach((test) => {
  test
})

mutationTests.forEach((test) => {
  test
})

postMutationTests.forEach((test) => {
  test
})
