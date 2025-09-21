
import React, { useState } from 'react';
import { useBlogStore } from '../store/BlogStore';
import { useQuery as useGraphQLQuery } from '@apollo/client'
import { GET_POSTS,  GET_ALL_USERS } from '../api/gql/blogs';

const BlogPageGQL = () => {
  const [currentQuery, setCurrentQuery] = useState('SCHEMA_QUERIES');
  
  // Use the selected query
  const getQuery = () => {
    switch(currentQuery) {
      
      case 'GET_POSTS': return GET_POSTS;
      
      case 'GET_ALL_USERS': return GET_ALL_USERS;
      default: return GET_POSTS;
    }
  };

  const { loading, error, data } = useGraphQLQuery(getQuery(), {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('GraphQL Error Details:', {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
        extraInfo: error.extraInfo
      });
    }
  });

  console.log("Current Query:", currentQuery);
  console.log("GQL Loading:", loading);
  console.log("GQL Error:", error);
  console.log("GQL Data:", data);

  if (loading) return <p>Loading GraphQL data...</p>;
  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">GraphQL Error</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error Message:</strong> {error.message}</p>
          {error.networkError && (
            <p><strong>Network Error:</strong> {error.networkError.message}</p>
          )}
          {error.graphQLErrors && error.graphQLErrors.length > 0 && (
            <div>
              <p><strong>GraphQL Errors:</strong></p>
              <ul className="list-disc ml-4">
                {error.graphQLErrors.map((err, index) => (
                  <li key={index}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">GraphQL Debug Page</h2>
      
      {/* Query Selection Buttons */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Query to Test:</h3>
        <div className="flex flex-wrap gap-2">
          {['GET_POSTS', 'GET_ALL_USERS'].map((queryName) => (
            <button
              key={queryName}
              onClick={() => setCurrentQuery(queryName)}
              className={`px-3 py-2 rounded text-sm ${
                currentQuery === queryName 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {queryName}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">Current: {currentQuery}</p>
      </div>

      {/* Display Results */}
      {data && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Query Results:</h3>
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>

          

          {/* Display blog posts if available */}
          {(data.blogs || data.posts || data.getAllPosts || data.blog) && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Blog Posts:</h4>
              {(data.blogs || data.posts || data.getAllPosts || [data.blog]).map((blog: any, index: number) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <h5 className="font-bold">{blog?.title}</h5>
                  <p>{blog?.contents}</p>
                </div>
              ))}
            </div>
          )}
          {/* Display users if available */}
          {data.getUsers && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Users:</h4>
              {data.getUsers.map((user: any, index: number) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPageGQL;


