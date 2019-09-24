import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const POSTS_QUERY = gql`
  query{
    posts{
      title
      createdAt
      author{
        username
      }
    }
  }
`
function PostList () {
  const { loading, error, data } = useQuery(POSTS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  console.log(data)
  // return data.posts.map(post => (
  //   <div>{post.title}</div>
  // ))
}

export default PostList
