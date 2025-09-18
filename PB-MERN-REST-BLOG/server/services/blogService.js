// Blog Post Service
import { BlogPost } from '../models/Blog.js';
import mongoose from 'mongoose';

const blogService = {
  createPost: async (title, content, authorId) => {
    const authorObjectId = new mongoose.Types.ObjectId(authorId);
    console.log('Author ObjectId:', authorObjectId);
    const newPost = new BlogPost({ title, content, author: authorObjectId });
    await newPost.save();
    return newPost;
  },

  getAllPosts: async () => {
    return await BlogPost.find().populate('author', 'userId name email').exec();
  },
  
  getPostById: async (postId) => {
    return await BlogPost.findById(postId).populate('author', 'userId name email').exec();
  },
  updatePost: async (postId, title, content) => {
    return await BlogPost.findByIdAndUpdate(postId, { title, content }, { new: true }).exec();
  },
  deletePost: async (postId) => {
    return await BlogPost.findByIdAndDelete(postId).exec();
  },

  /////////  Add Comments
  addComment: async (postId, authorId, content) => {
    const comment = new Comment({ postId, author: authorId, content });
    await comment.save();
    return comment;
  },

  getCommentsForPost: async (postId) => {
    return await Comment.find({ postId }).populate('author', 'userId name email').exec();
  },

  deleteComment: async (commentId) => {
    return await Comment.findByIdAndDelete(commentId).exec();
  },
  //////// Add Likes
  likePost: async (postId, userId) => {
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return existingLike; // Already liked
    }
    const like = new Like({ postId, userId });
    await like.save();
    return like;
  },

  unlikePost: async (postId, userId) => {
    return await Like.findOneAndDelete({ postId, userId }).exec();
  },

  getLikesForPost: async (postId) => {
    return await Like.find({ postId }).populate('userId', 'userId name email').exec();
  }
  // Add more methods as needed
};

export default blogService;