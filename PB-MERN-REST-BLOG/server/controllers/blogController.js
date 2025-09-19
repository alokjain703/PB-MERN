import blogService from '../services/blogService.js';

const blogController = {
  getAllPosts: async (req, res) => {
    const posts = await blogService.getAllPosts();
    res.json(posts);
  },

  getPaginatedSummaryOfPosts: async (req, res) => {
    console.log("Query params:", req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const result = await blogService.getPaginatedSummaryOfPosts(page, limit, sortBy);
    res.json(result);
  },

  getPostById: async (req, res) => {
    const post = await blogService.getPostById(req.params.id);
    res.json(post);
  },

  createPost: async (req, res) => {
    const { title, content, authorId, excerpt, tags, category } = req.body;
    const newPost = await blogService.createPost(title, content, authorId, excerpt, tags, category);
    res.status(201).json(newPost);
  },

  updatePost: async (req, res) => {
    const { title, content } = req.body;
    const updatedPost = await blogService.updatePost(req.params.id, title, content);
    res.json(updatedPost);
  },

  deletePost: async (req, res) => {
    await blogService.deletePost(req.params.id);
    res.status(204).send();
  },

  // Comments for posts
 addComment: async (req, res) => {
    const { postId, authorId, content } = req.body;
    const comment = await blogService.addComment(postId, authorId, content);
    res.status(201).json(comment);
  },
  getCommentsForPost: async (req, res) => {
    const comments = await blogService.getCommentsForPost(req.params.postId);
    res.json(comments);
  },
  deleteComment: async (req, res) => {
    await blogService.deleteComment(req.params.commentId);
    res.status(204).send();
  },
  
  // Likes for posts
  likePost: async (req, res) => {
    const { postId, userId } = req.body;
    const like = await blogService.likePost(postId, userId);
    res.status(201).json(like);
  },
  unlikePost: async (req, res) => {
    const { postId, userId } = req.body;
    await blogService.unlikePost(postId, userId);
    res.status(204).send();
  },
  getLikesForPost: async (req, res) => {
    const likes = await blogService.getLikesForPost(req.params.postId);
    res.json(likes);
  }

};

export default blogController;
