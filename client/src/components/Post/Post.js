import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import { GET_POST } from '../../queries'

const Post = ({ match }) => {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: match.params.postId }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <article>
      <h2>{data.post.title}</h2>
      <h3>{data.post.author.username}</h3>
      <p>{data.post.createdAt}</p>
      <p>{data.post.body}</p>
    </article>
  )
}

export default Post
