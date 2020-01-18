export interface PostsState {
  posts: Post[];
}

export interface Post {
  _id: string;
  categories: string[];
  likes: number;
  title: string;
  imageUrl: string;
  description: string;
  createdBy: string;
  createdDate: Date;
  message: string[];
}

export interface QueryGetPosts {
  getPosts: Post[];
}

export const POSTS_TYPES = {
  mutations: {
    SETPOSTS: 'SETPOSTS',
  },
  getters: {
    GETPOST: 'GETPOSTS',
  },
  actions: {
    ACTPOSTS: 'ACTPOSTS',
  },
};
