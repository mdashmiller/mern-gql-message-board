export const usersProjection = {
  _id: 0,
  username: 1,
  posts: 1
}

export const populatePosts = {
  path: 'posts',
  select: 'title createdAt -_id'
}

export const postsProjection = {
  _id: 0,
  body: 0,
  updatedAt: 0
}

export const populateAuthor = {
  path: 'author',
  select: 'username -_id'
}
