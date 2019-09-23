GUEST

Log in

Sign Up
  TODO: \routes\confirm determine what to do in res when email is confirmed
  TODO: \routes\confirm add setTimeout to catch error if db overwrite fails?

Send Auth Token
  TODO: make \auth { sendToken } async


AUTHENTICATED

Get user info
  your own info
  list of other users
  info on a single user

Update your own user info

Forgot password email system
  TODO: could \routes\confirm and \routes\forgotPassword be refactored into a single route?
  TODO: \routes\forgotPassword verify token - check error handling

Delete profile

Read posts
  get list of posts
  get a single post

Create post

Delete post

Log out



OTHER

TODO: async v awaiting transporter.sendMail and how to handle errors
TODO: look into Redis as session store
TODO: gql security - infinite nested requests, etc
