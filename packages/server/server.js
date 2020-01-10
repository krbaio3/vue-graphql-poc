const {
    ApolloServer
} = require('apollo-server');
const {connect, set} = require('mongoose');
const {readFileSync} = require('fs')
const {join} = require('path')

// import typedefs and resolvers
const filePath = join(__dirname, 'typeDefs.gql');
const typeDefs = readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');
// end import typedefs and resolvers

// import Env Var and Mongoose Models
const Post = require('./models/Post');
const User = require('./models/User');
switch (process.env.NODE_ENV) {
    case 'production':
        require('dotenv').config({
            path: '.env.production'
        });
        break;
    case 'develop':
        require('dotenv').config({
            path: '.env.dev'
        });
        break;
    default:
        require('dotenv').config({
            path: '.env.local'
        });
        break;
};
// end import Env Var and Mongoose Models

// Mongoose MLab DB
connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log('DB connected')).catch(err => console.error(err));
set('useCreateIndex', true);
// end Mongoose

// create Apollo/GraphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});
// end create Apollo/GraphQL server

// server
server.listen(4000).then(({
    url
}) => console.log(`🚀 Server listening in ${url} 🦄`));