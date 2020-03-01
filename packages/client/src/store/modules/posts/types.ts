export interface PostsState {
  posts: Post[];
  loading: boolean;
  postResults: Post[] | [];
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
  categories: string[];
  description: string;
  title: string;
  // image: string;
  imageUrl: string;
  // nameImgURL: string;
  creatorID: string;
}

export const POSTS_TYPES = {
  mutations: {
    SET_POSTS: 'SET_POSTS',
  },
  getters: {
    GET_POST: 'GET_POSTS',
    GET_LOADING_POST: 'GET_LOADING_POST',
  },
  actions: {
    ACT_POSTS: 'ACT_POSTS',
  },
};
