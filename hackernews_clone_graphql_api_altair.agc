{
  "version": 1,
  "type": "collection",
  "title": "Hackernews Clone GraphQL API - Altair",
  "queries": [
    {
      "version": 1,
      "type": "window",
      "query": "query {\n  feed {\n    description\n    url\n    postedBy {\n      name\n    }\n    voters {\n      id\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Query Database",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "610691dd-1bc0-4532-b707-66f05f20c4bc",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n  login(email: \"crbroughton@posteo.uk\", password: \"graphql\") {\n    token\n    user {\n      id\n      email\n      posts {\n        url\n        description\n      }\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Login",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "e2c67098-c246-48cd-b078-b66497fc9e06",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n  post(url: \"nexusjs.org\", topic: \"General\" description: \"Code-First GraphQL schemas for JavaScript/TypeScript\") {\n    id\n    description\n    url\n    postedBy {\n      id\n      name\n      email\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "Authorization",
          "value": "bearer ",
          "enabled": true
        }
      ],
      "windowName": "Create Post (Requires Auth)",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "e51b2e9c-1705-429f-8e03-d45d8ec98a2a",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n  signup(name: \"crbroughton\", email: \"crbroughton@posteo.uk\", password: \"graphql\") {\n    token\n    user {\n      id\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Create Account",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "e5a8a1a7-99e0-47c0-b303-09238a9a23ef",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n  updateLink(id: 1, url: \"www.google.com\") {\n    id\n    url\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Update URL via Mutation",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "c6bcc0c6-d3ac-4090-a745-ab0d7d8495a1",
      "created_at": 1643543387452,
      "updated_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n  deletePost(id: \"0569a3af-ae9f-4452-83c8-a0e8fde02833\")\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Delete Post",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "f396cf12-2cf3-4a65-96ad-e8fca0d7f950",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation{\n  vote(postId: \"3874b765-deb9-4dbc-941c-4e93e14bac01\") {\n    post {\n      id\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "Authorization",
          "value": "bearer ",
          "enabled": true
        }
      ],
      "windowName": "Vote on Post",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "7b0fd253-019f-456b-ab84-7d797aca3651",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "mutation {\n\tauthenticate(cookie: \"\") {\n    token\n    user {\n      id\n      name\n      email\n      posts {\n        id\n        description\n        }\n    }\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Authenticate User",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "5d1c14e1-5792-45fb-a4f6-7a3a4cb97ff4",
      "updated_at": 1643543770316
    },
    {
      "version": 1,
      "type": "window",
      "query": "query {\n  getUserPosts {\n    id\n    description\n    url\n    voters {\n      id\n      name\n      email\n    }\n  } \n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "Authorization",
          "value": "bearer ",
          "enabled": true
        }
      ],
      "windowName": "Get A Specific Users Posts",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "070d05c1-6e85-4a0c-be57-1892ed4b5d52",
      "updated_at": 1643543387452,
      "created_at": 1643543387452
    },
    {
      "version": 1,
      "type": "window",
      "query": "query {\n  getTopicPosts(topic: \"General\") {\n    id\n    description\n    url\n  }\n}",
      "apiUrl": "http://localhost:3000/",
      "variables": "{}",
      "subscriptionUrl": "",
      "subscriptionConnectionParams": "{}",
      "headers": [
        {
          "key": "",
          "value": "",
          "enabled": true
        }
      ],
      "windowName": "Get specified topic posts",
      "preRequestScript": "",
      "preRequestScriptEnabled": false,
      "postRequestScript": "",
      "postRequestScriptEnabled": false,
      "id": "182774c7-f8c2-4a7c-bea0-98ea3d5cab0d",
      "created_at": 1643543387452,
      "updated_at": 1643543387452
    }
  ],
  "parentPath": "",
  "created_at": 1643543387452,
  "updated_at": 1643543770316,
  "id": 1,
  "collections": []
}