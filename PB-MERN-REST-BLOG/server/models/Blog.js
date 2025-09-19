import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  slug: { type: String, required: true, unique: true } // URL-friendly identifier
});

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, max: 200 },
  tags: { type: [String], default: [] },
  status: { type: String,  enum: ['draft', 'published'], default: 'draft' },
  author: { type: ObjectId, ref: 'User', required: true },
  category: { type: [String] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date },
  slug: { type: String, required: true, unique: true } // URL-friendly identifier
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

const CommentSchema = new Schema({
  postId: { type: ObjectId, ref: 'BlogPost', required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
 
  status: { type: String, enum: ['approved', 'visible', 'hidden'], default: 'visible' },
   createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);

const LikesSchema = new Schema({
  postId: { type: ObjectId, ref: 'BlogPost', required: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", LikesSchema);

export { Comment, BlogPost, Like, BlogCategory };
