import {create} from 'zustand';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  removePost: (_id: string) => void;
  currentPost: BlogPost | null;
  setCurrentPost: (post: BlogPost | null) => void;
  
  postMode: 'viewPost' | 'editPost' | 'createPost' | 'viewPostList';
  setPostMode: (mode: 'viewPost' | 'editPost' | 'createPost' | 'viewPostList') => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  removePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  currentPost: null,
  setCurrentPost: (post) => set({ currentPost: post }),
 
  postMode: 'viewPost',
  setPostMode: (mode) => set({ postMode: mode }),
}));
