// Blog Post Service
import { BlogPost } from '../models/Blog.js';
import mongoose from 'mongoose';

const blogService = {

  ///// POST RELATED METHODS
  createPost: async ({title, content, authorId, excerpt, tags, category}) => {
    const authorObjectId = new mongoose.Types.ObjectId(authorId);
    console.log('Author ObjectId:', authorObjectId);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Excerpt:', excerpt);
    console.log('Tags:', tags);
    console.log('Category:', category);
    if (!excerpt) {
      excerpt = content.substring(0, 200); // Default excerpt to first 200 chars
    }
    if (!tags) {
      tags = [];
    }
    if (!category) {
      category = 'General';
    }
    const status = 'draft'; // Default status
    const  slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); // Simple slug generation
    // Ensure slug is unique (in a real app, you'd want a more robust solution)
    const existingPost = await BlogPost.findOne({ slug }).exec();
    if (existingPost) {
      throw new Error('A post with this title already exists. Please choose a different title.');
    }
    const newPost = new BlogPost({ title, content, author: authorObjectId, excerpt, tags, category, status, slug });
    await newPost.save();
    return newPost;
  },

  getAllPosts: async () => {
    return await BlogPost.find().populate('author', 'userId name email').exec();
  },

  getPaginatedSummaryOfPosts: async (page = 1, limit = 10, sortBy = 'createdAt') => {
    const skip = (page - 1) * limit;
    const posts = await BlogPost.find()
      .select('title excerpt author createdAt') // Select only summary fields
      .populate('author', 'userId name email') // Populate author details
      .sort({ [sortBy]: -1 }) // Sort by specified field descending
      .skip(skip)
      .limit(limit)
      .exec();
    
    const totalPosts = await BlogPost.countDocuments().exec();
    const totalPages = Math.ceil(totalPosts / limit) ;
    
    return { posts, currentPage: page, totalPages, totalPosts };
  },

  fetchPostsByAuthorId: async (authorId) => {
    const authorObjectId = new mongoose.Types.ObjectId(authorId);
    return await BlogPost.find({ author: authorObjectId }).populate('author', 'userId name email').exec();
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

  /////////  COMMENTS RELATED METHODS
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
  //////// LIKES RELATED METHODS
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