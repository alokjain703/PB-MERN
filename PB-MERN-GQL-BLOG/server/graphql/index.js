import { querySchema, queryResolver } from './query.js'
import { blogResolver, blogSchema } from './blog.js'
import { userResolver, userSchema } from './user.js'
import { mutationSchema, mutationResolver } from './mutation.js'

export const typeDefs = [querySchema, blogSchema, userSchema, mutationSchema]
export const resolvers = [queryResolver, blogResolver, userResolver, mutationResolver]
