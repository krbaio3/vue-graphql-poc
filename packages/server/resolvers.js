const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const EXPIRES_IN = '1hr';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Post',
      });
      return user;
    },
    getPosts: async (_, args, { Post }) => {
      const post = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          model: 'User',
          path: 'createdBy',
        });
      return post;
    },
    getPost: async(_, {postId},{ Post}) => {
      const post = await Post.findOne({ _id: postId}).populate({
        path: 'messages.messageUser',
        model: 'User'
      });
      return post;
    },
    getAllUser: async (_, args, { User }) => {
      const user = await User.find({});
      return user;
    },
    getUser: async (_, { username }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
    infiniteScrollPosts: async (_, {pageNum, pageSize}, {Post}) => {
      let posts;

      if(pageNum ===1) {
        posts = await Post.find({}).sort({ createdDate: 'desc'}).populate({
          path: 'createdBy',
          model: 'User'
        }).limit(pageSize);
      } else {
        // If page number is greater than one, figure out how many documents to skip
        const skips = pageSize * (pageNum -1);
        posts = await Post.find({}).sort({ createdDate: 'desc'}).populate({
          path: 'createdBy',
          model: 'User'
        }).skip(skips).limit(pageSize);
      }
      const totalDoc = await Post.countDocuments();
      const hasMore = totalDoc > pageSize * pageNum;
      return {posts, hasMore};
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorID },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorID,
      }).save();
      return newPost;
    },
    addPostMessage: async (_, {messageBody, user, postId}, {Post})=> {
      
      const newMessage = {
        messageBody,
        messageUser: user,
      };
      const post = await Post.findOneAndUpdate(
        // find post by id
        {_id: postId },
        // prepend new message to beginning of messages array
        { $push: { messages: { $each: [newMessage], $position: 0 }}},
        // return fresh document after update
        { new: true }
      ).populate({
        path: 'messages.messageUser',
        model: 'User'
      });

      return post.messages[0];
    },
    signUpUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({
        username,
      });

      if (user) {
        throw new Error('User exists');
      }

      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, EXPIRES_IN) };
    },
    likePost: async(_, {postId, username}, { Post, User}) => {
      // Find Post, add ine to its 'like; value
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: 1 } },
        { new: true }
      );
        // find user add id of post to its favorites array
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: postId}},
        { new: true }
      ).populate({
        path: 'favorites',
        model: 'Post'
      });

      return {likes: post.likes, favorites: user.favorites};
    },
    unlikePost: async(_, {postId, username}, { Post, User}) => {
      // Find Post, remove ine to its 'like; value
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: -1 } },
        { new: true }
      );
        // find user remove id of post to its favorites array
      const user = await User.findOneAndUpdate(
        {username},
        { $pull: { favorites: postId}},
        { new: true }
      ).populate({
        path: 'favorites',
        model: 'Post'
      });

      return {likes: post.likes, favorites: user.favorites};
    },
    signInUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({
        username,
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }

      return { token: createToken(user, process.env.SECRET, EXPIRES_IN) };
    },
  },
};
