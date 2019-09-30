import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import { GET_POSTS } from '../../queries'

const PostList = () => {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div>
      {data.posts.map(
        post => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <h3>{post.author.username}</h3>
              <p>{post.createdAt}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostList
