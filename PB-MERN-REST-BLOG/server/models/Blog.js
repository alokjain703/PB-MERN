import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

const CommentSchema = new Schema({
  postId: { type: ObjectId, ref: 'BlogPost', required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", CommentSchema);

const LikesSchema = new Schema({
  postId: { type: ObjectId, ref: 'BlogPost', required: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", LikesSchema);

export { Comment, BlogPost, Like };
