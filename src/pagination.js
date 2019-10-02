export const findPaginatedData = (schema, args, projection = null) => {
  const limit = args.limit || 5
  // const limit = args.limit || 20
  const page = (args.page || 1) - 1

  return schema.find({}, projection).limit(limit).skip(limit * page)
}
