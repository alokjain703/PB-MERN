
import BlogList from '../components/blog/BlogList';

const BlogPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Blog</h2>
      <p>Welcome to the blog page! Here you'll find the latest articles and updates.</p>
    <BlogList />
    </div>
  );
};

export default BlogPage;
