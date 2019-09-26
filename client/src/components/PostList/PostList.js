import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_POSTS = gql`
  query{
    posts{
      id
      title
    }
  }
`

const PostList = () => {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div>
      {data.posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  )
}

export default PostList
