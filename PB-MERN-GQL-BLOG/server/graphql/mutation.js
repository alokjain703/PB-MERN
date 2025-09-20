import { GraphQLError } from "graphql";
import userService from '../services/userService.js';
import blogService from '../services/blogService.js';
import authService from "../services/authService.js";

export const mutationSchema = `#graphql
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  
  input UpdateUserInput {
    name: String
    email: String
    password: String
  }
  input CreateBlogPostInput {
    title: String!
    content: String!
    authorId: String!
  }
  input UpdateBlogPostInput {
    title: String
    content: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type BlogPost {
    id: ID!
    title: String!
    content: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    createBlogPost(input: CreateBlogPostInput!): BlogPost!
    updateBlogPost(id: ID!, input: UpdateBlogPostInput!): BlogPost!
    deleteBlogPost(id: ID!): Boolean!
  }
`;

export const mutationResolver = {
  Mutation: {
    ////// User Mutations //////
    createUser: async (parent, args) => {
      const { input } = args;
      return await userService.createUser(input);
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await authService.authenticate(email, password);
      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      const token = authService.generateToken(user);
      return { token, user };
    },
    updateUser: async (parent, args) => {
      const { id, input } = args;
      return await userService.updateUser(id, input);
    },
    deleteUser: async (parent, args) => {
      const { id } = args;
      const deletedUser = await userService.deleteUser(id);
      return !!deletedUser;
    },

    ////// Blog Post Mutations //////
    createBlogPost: async (parent, args) => {
      console.log('Creating blog post...');
      console.log('Input args:', args);
      const { input } = args;
      console.log('Input data:', input);
      const { title, content, authorId, excerpt, tags, category } = input;
      console.log('Extracted fields:', {title, content, authorId, excerpt, tags, category});
      return await blogService.createPost(title, content, authorId, excerpt, tags, category);
    },
    updateBlogPost: async (parent, args) => {
      const { id, input } = args;
      return await blogService.updatePost(id, input);
    },
    deleteBlogPost: async (parent, args) => {
      const { id } = args;
      return await blogService.deletePost(id);
    },
  },
};
