const CreateBlog = () => {
  const { setPostMode } = useBlogStore();

  const handleCreatePost = () => {
    setPostMode('create');
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <button onClick={handleCreatePost}>New Post</button>
    </div>
  );
};

export default CreateBlog;
