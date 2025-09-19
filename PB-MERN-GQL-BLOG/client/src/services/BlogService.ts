// Get blog posts with pagination
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BlogService = {
    getBlogsSummary: async (page: number, limit: number, sortBy: string) => {
      const queryParams = new URLSearchParams({ page: page.toString(), limit: limit.toString(), sortBy });
      console.log('Query Params:', queryParams.toString());
      const response = await fetch(`${BASE_URL}/blogs/summary/paginated?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return response.json();
    }
  };

export default BlogService;