import React, { useReducer } from 'react'

import { useMutation } from '@apollo/react-hooks'

import { CREATE_POST } from '../../queries'

const postReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }
    case 'post': {
      return {
        ...state,
        isPosting: true,
        error: ''
      }
    }
    case 'error': {
      return {
        ...state,
        error: action.payload,
        isPosting: false
      }
    }
    default:
      return state
  }
}

const initialState = {
  title: '',
  message: '',
  error: '',
  isPosting: false
}

const CreatePost = ({ history }) => {
  const [state, dispatch] = useReducer(postReducer, initialState)
  const { title, message, error, isPosting } = state
  const [createPost] = useMutation(CREATE_POST)

  async function handleSumbit (e) {
    e.preventDefault()

    // allow user to create a post without a title -- server
    // will generate it from the body content
    const variables = title === '' ? (
      {
        authorId: "5d86893f325b880bac6070ad",
        body: message
      }
    ) : (
      {
          authorId: "5d86893f325b880bac6070ad",
          title,
          body: message
      }
    )

    dispatch({ type: 'post' })

    try {
      await createPost({ variables })

      history.push('/posts')
    } catch (err) {
      dispatch({ type: 'error', payload: 'Oops, there seems to be an error. Please try again.'})
    }
  }

  return (
    <section>
      <form onSubmit={handleSumbit}>
        <h2>Create Post</h2>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'title',
                payload: e.currentTarget.value
              })
            }
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            id="message"
            value={message}
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'message',
                payload: e.currentTarget.value
              })
            }
          />
        </div>
        <div>
          <button disabled={isPosting}>
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
