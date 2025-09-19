import React from "react";
import BlogService from "../../services/BlogService";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Pagination, Select, MenuItem } from "@mui/material";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [blogsPerPage, setBlogsPerPage] = useState<number>(3);

  const handleBlogsPerPage = (value: number) => {
    setBlogsPerPage(value);
    setCurrentPage(1);
    const fetchBlogs = async () => {
      const response = await BlogService.getBlogsSummary(1, value, "createdAt");
      setBlogs(response.posts);
      setTotalNumberOfPages(response.totalPages);
      setTotalPosts(response.totalPosts);
      console.log("Fetched blogs for blogsPerPage", value, ":", response);
    };
    fetchBlogs();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    // Fetch new page of blogs
    const fetchBlogs = async () => {
      const response = await BlogService.getBlogsSummary(
        value,
        blogsPerPage,
        "createdAt"
      );
      setBlogs(response.posts);
      setTotalNumberOfPages(response.totalPages);
      setTotalPosts(response.totalPosts);
      console.log("Fetched blogs for page", value, ":", response);
    };
    fetchBlogs();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await BlogService.getBlogsSummary(
        currentPage,
        blogsPerPage,
        "createdAt"
      );
      setBlogs(response.posts);
      setCurrentPage(response.currentPage);
      setTotalNumberOfPages(response.totalPages);
      setTotalPosts(response.totalPosts);
      console.log("Fetched blogs:", response);
      console.log("Posts:", response.posts);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
      {/* Blog posts will be rendered here */}
      <Box>
        <List>
          {blogs &&
            blogs.map((blog) => (
              <ListItem key={blog._id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={blog.author?.name}
                    src={blog.author?.avatarUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={blog.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {blog.author?.name}
                      </Typography>
                      {" — "}
                      {blog.excerpt}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalNumberOfPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
          <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="body2" padding="10px">
              Blogs Per Page:{" "}
            </Typography>
            <Select
              value={blogsPerPage}
              onChange={(e) => handleBlogsPerPage(Number(e.target.value))}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Showing {blogs.length} of {totalPosts} posts.
        </Typography>
      </Box>
    </div>
  );
};

export default BlogList;
