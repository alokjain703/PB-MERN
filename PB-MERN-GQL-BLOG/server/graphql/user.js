import blogService from '../services/blogService.js';
export const userSchema = `#graphql
  type User {
    id: ID!
    userId: String
    name: String!
    email: String!
    blogs: [Blog]
  }
`;

export const userResolver = {
  User: {
    blogs: async (parent) => {
      return await blogService.fetchPostsByAuthorId(parent.id);
    },
  },
};
