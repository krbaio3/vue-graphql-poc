const { compare } = require('bcrypt');

module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const post = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          model: 'User',
          path: 'createdBy'
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
        createdBy: creatorID
      }).save();
      return newPost;
    },
    signUpUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({
        username
      });

      if (user) {
        throw new Error('User exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      console.log(newUser);
      return newUser;
    },
    signInUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({
        username
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }

      return user;
    }
  }
};
