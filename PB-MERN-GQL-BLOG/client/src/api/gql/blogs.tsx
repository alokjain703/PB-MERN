import { gql } from '@apollo/client'

// Test query to check if GraphQL server is working
export const TEST_QUERY = gql`
  query {
    __schema {
      types {
        name
      }
    }
  }
`;

// Query to see available queries
export const SCHEMA_QUERIES = gql`
  query {
    __schema {
      queryType {
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query  {
    blogs {
      title
      contents
    }
  }
`;

// Alternative queries to try (common variations)
export const GET_POSTS_ALT1 = gql`
  query {
    posts {
      title
      contents
    }
  }
`;

export const GET_POSTS_ALT2 = gql`
  query {
    getAllPosts {
      title
      contents
    }
  }
`;

export const GET_POSTS_ALT3 = gql`
  query {
    blog {
      title
      contents
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    Users {
      username
      email
    }
  }
`;
