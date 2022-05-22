import { createUser } from './CreateUser'
import { loginUser } from './LoginUser'
import { queryFeed } from './QueryFeed'
import { createPost } from './CreatePost'
import { getUserPosts } from './GetUserPosts'
import { getTopicPosts } from './GetTopicPosts'

const authTests = [createUser, loginUser]
const queryTests = [queryFeed]
const mutationTests = [createPost]
const postMutationTests = [getUserPosts, getTopicPosts]

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
