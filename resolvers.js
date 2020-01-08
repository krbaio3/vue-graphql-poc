module.exports = {
    Query: {
        getPosts: async (_, args, {
            Post
        }) => {
            const post = await Post.find({})
                .sort({createdDate: 'desc'})
                .populate({
                    model: 'User',
                    path: 'createdBy',
                });
            return post;
        }
    },
    Mutation: {
        addPost: async (_, {
            title,
            imageUrl,
            categories,
            description,
            creatorID
        }, {
            Post
        }) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorID
            }).save();
            return newPost;
        },
        signupUser: async (_, {
            username,
            email,
            password
        }, {
            User
        }) => {
            const user = await User.findOne({
                username: username
            });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return newUser;
        }
    }
};