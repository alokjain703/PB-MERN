import userService from '../services/userService.js'
export const blogSchema = `#graphql
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User
  }
`;

export const blogResolver = {
  Blog: {
    author: async (parent) => {
      return await userService.getUserById(parent.authorId);
    },
  },
};
