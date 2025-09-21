import blogService from '../services/blogService.js';
import userService from '../services/userService.js';
export const querySchema = `#graphql
  type Query {
    test: String
    blogs: [Blog]
    blogsByUser(authorId: ID!): [Blog]
    user(id: ID!): User
    getUsers: [User]
  }
`;

export const queryResolver = {
  Query: {
    test: () => {
      console.log('Testing GraphQL endpoint');
      return 'Hello World from GraphQL!'
    },
    blogs: async () => {
      console.log('Fetching all blogs');
      return await blogService.getAllPosts();
    },
    blogsByUser: async (parent, args) => {
      console.log('Fetching blogs for user with ID:', args.authorId);
      return await blogService.fetchPostsByAuthorId(args.authorId);
    },
    user: async (parent, args) => {
      console.log('Fetching user with ID:', args.id);
      return await userService.getUserById(args.id);
    },
    getUsers: async () => {
      console.log('Fetching all users');
      return await userService.getAllUsers();
    }
  },
};
