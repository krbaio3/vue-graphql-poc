const {
    ApolloServer
} = require('apollo-server');
const {connect, set} = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const {readFileSync} = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'typeDefs.gql');
const typeDefs = readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

switch (process.env.NODE_ENV) {
    case 'production':
        require('dotenv').config({
            path: 'prod.env'
        });
        break;
    case 'develop':
        require('dotenv').config({
            path: 'dev.env'
        });
        break;
    default:
        require('dotenv').config({
            path: 'local.env'
        });
        break;
};
// Mongoose
connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log('DB connected')).catch(err => console.error(err));
set('useCreateIndex', true);
// end Mongoose

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen(4000).then(({
    url
}) => console.log(`🚀 Server listening in ${url} 🦄`));