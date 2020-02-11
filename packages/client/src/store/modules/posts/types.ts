export interface PostsState {
  posts: Post[];
  loading: boolean;
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

export interface AddPost {
  item: string;
  description: string;
  title: string;
  image: string;
  imageURL: string;
  nameImgURL: string;
}

export const POSTS_TYPES = {
  mutations: {
    SETPOSTS: 'SETPOSTS',
  },
  getters: {
    GET_POST: 'GET_POSTS',
    GET_LOADING_POST: 'GET_LOADING_POST',
  },
  actions: {
    ACT_POSTS: 'ACT_POSTS',
  },
};
