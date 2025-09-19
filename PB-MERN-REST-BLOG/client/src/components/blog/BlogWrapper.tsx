import Blog from './Blog';
import BlogList from './BlogList';
import React from 'react';
import { useBlogStore } from '../../store/BlogStore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const BlogWrapper = () => {
  const { currentPost, setCurrentPost, postMode, setPostMode } = useBlogStore();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Blog Wrapper</h2>
      <p>Welcome to the blog Wrapper! </p>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Typography component="div" sx={{ display: 'flex', gap: 2 }}>
          
          <a href="#" onClick={() => setPostMode('createPost')}>New Post</a>
          <a href="#" onClick={() => setPostMode('viewPost')}>View Post</a>
          <a href="#" onClick={() => setPostMode('editPost')}>Edit Post</a>
          <a href="#" onClick={() => setPostMode('viewPostList')}>View Post List</a>
        </Typography>
      </Box>
      <Box>
        {(postMode === 'createPost' || postMode === 'viewPost' || postMode === 'editPost') ? <Blog /> : <BlogList />}
      </Box>
    </div>
  );
};

export default BlogWrapper;