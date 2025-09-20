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
      const resp = await userService.getUserById(parent.author);
      return resp;
    },
  },
};
