import React, { useState } from 'react'

import { connect } from 'react-redux'

import { signIn } from '../../actions'

const mapStateToProps = ({ errors }) => ({
  errors
})

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user))
})

function SignIn({ errors, signIn }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    setIsLoading(true)

    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    try {
      signIn(user)
    } catch (err) {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <p>Please Login!</p>
        <p>{errors}</p>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
