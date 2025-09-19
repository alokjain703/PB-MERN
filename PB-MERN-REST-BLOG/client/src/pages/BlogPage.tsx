import Blog from '../components/blog/Blog';
import BlogList from '../components/blog/BlogList';
import React from 'react';
import { useBlogStore } from '../store/BlogStore';
import BlogWrapper from '../components/blog/BlogWrapper';

const BlogPage = () => {
  
 const { currentPost, setCurrentPost } = useBlogStore();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Blog Page</h2>
      <p>Welcome to the blog page! Here you'll find the latest articles and updates.</p>
      <BlogWrapper />
    </div>
  );
};

export default BlogPage;


