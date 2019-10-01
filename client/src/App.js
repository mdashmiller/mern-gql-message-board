import React from 'react'

import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'

import Nav from './components/Nav'
import SignIn from './components/SignIn'
import PostList from './components/PostList'
import Post from './components/Post'
import CreatePost from './components/CreatePost'

function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/posts" component={PostList} />
        <Route exact path="/post/:postId" component={Post} />
        <Route exact path="/create-post" component={CreatePost} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </Router>
  )
}

export default App
