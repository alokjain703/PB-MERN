import express from 'express';
const router = express.Router();

import blogController from '../controllers/blogController.js';

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', blogController.createPost);
router.put('/:id', blogController.updatePost);
router.delete('/:id', blogController.deletePost);
// Comments routes
router.post('/comments', blogController.addComment);
router.get('/:postId/comments', blogController.getCommentsForPost);
router.delete('/comments/:commentId', blogController.deleteComment);
// Likes routes
router.post('/likes', blogController.likePost);
router.delete('/likes', blogController.unlikePost);
router.get('/:postId/likes', blogController.getLikesForPost);

export default router;