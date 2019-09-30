import React from 'react'

import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'

import SignIn from './components/SignIn'
import PostList from './components/PostList'
import Post from './components/Post'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/posts" component={PostList} />
        <Route path="/post" component={Post} />
      </Switch>
    </Router>
  )
}

export default App
