export const getTopicPosts
= `
  query getTopicPosts($topic: String!) {
    getTopicPosts(topic: $topic) {
      id
      description  
      url
      topic
      postedBy {
        id
        name
      }
      voters {
        id
      }
    }
  }
`
