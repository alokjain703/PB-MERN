import { gql } from '@apollo/client'



export const GET_POSTS = gql`
  query Blogs {
    blogs {
      title
      content
      author {
        name
        email
      }
    }
  }
`;



export const GET_ALL_USERS = gql`
  query GetUsers{
    getUsers {
      email
      name
      userId
    }
  }
`;
