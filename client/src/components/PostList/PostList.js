import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'

import { GET_POSTS } from '../../queries'

import { Link } from 'react-router-dom'

const PostList = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const variables = isLoadingMore ? ({ page }) : ({})
  const { loading, error, data } = useQuery(GET_POSTS, { variables })

  function loadMore () {
    setIsLoadingMore(true)

    setPage(page + 1)
  }

  useEffect(() => {
    setIsLoadingMore(false)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <section>
      {data.posts.map(
        post => {
          return (
            <div key={post.id}>
              <Link to={`post/${post.id}`}><h2>{post.title}</h2></Link>
              <h3>{post.author.username}</h3>
              <p>{post.createdAt}</p>
            </div>
          )
        })
      }
      <button onClick={loadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </section>
  )
}

export default PostList
