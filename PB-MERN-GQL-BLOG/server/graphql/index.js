import { querySchema, queryResolver } from './query.js'
import { blogResolver, blogSchema } from './blog.js'
import { userResolver, userSchema } from './user.js'

export const typeDefs = [querySchema, blogSchema, userSchema]
export const resolvers = [queryResolver, blogResolver, userResolver]
