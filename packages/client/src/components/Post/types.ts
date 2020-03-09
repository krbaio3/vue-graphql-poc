import { User } from '../../store/types';

export interface AddPost {
  item: string;
  description: string;
  title: string;
  image: string;
  imageURL: string;
  nameImgURL: string;
}

export interface Message {
  _id: string;
  messageBody: string;
  messageDate: string;
  messageUser: User;
}
