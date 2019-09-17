export const usersProjection = {
  _id: 0,
  username: 1,
  posts: 1
}

export const populatePosts = args => {
  const limit = args.limit || 10
  const page = (args.page || 1) - 1

  return {
    path: 'posts',
    select: 'title createdAt -_id',
    options: {
      limit,
      skip: limit * page
    }
  }
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
