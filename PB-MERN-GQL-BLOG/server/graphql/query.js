import blogService from '../services/blogService.js';
export const querySchema = `#graphql
  type Query {
    test: String
    blogs: [Blog]
    blogsByUser(authorId: ID!): [Blog]
    user(id: ID!): User
  }
`;

export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello World from GraphQL!'
    },
    blogs: async () => {
      return await blogService.getAllPosts();
    },
    blogsByUser: async (parent, args) => {
      return await blogService.fetchPostsByAuthorId(args.authorId);
    },
    user: async (parent, args) => {
      return await userService.getUserById(args.id);
    }
  },
};
