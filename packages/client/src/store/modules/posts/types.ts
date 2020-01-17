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
