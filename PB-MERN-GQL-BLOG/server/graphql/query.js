import blogService from '../services/blogService.js';
export const querySchema = `#graphql
  type Query {
    test: String
    blogs: [Blog]
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
  },
}

