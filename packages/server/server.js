const { ApolloServer, AuthenticationError } = require('apollo-server');
const { connect, set, connection } = require('mongoose');
const { readFileSync } = require('fs');
const { join } = require('path');
const { verify } = require('jsonwebtoken');

const port = process.env.PORT || 4000;

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
      path: '.env.production',
    });
    break;
  case 'develop':
    require('dotenv').config({
      path: '.env.development',
    });
    break;
  default:
    require('dotenv').config({
      path: '.env',
    });
    break;
}
// end import Env Var and Mongoose Models

// Mongoose MLab DB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err));
set('useCreateIndex', true);
set('useFindAndModify', false);

// Added check for DB connection
!connection
  ? console.log('Error connecting db 💩')
  : console.log('Db connected successfully 🍔');
// end Mongoose

// Verify the JWT Token from client
const getUser = async (token) => {
  // console.log('entra');
  // console.log('token', token);
  if (token) {
    try {
      return await verify(token, process.env.SECRET);
    } catch (error) {
      throw new AuthenticationError(
        'La sesion ha terminado. Vuelva a hacer Sign In'
      );
    }
  }
};

// create Apollo/GraphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // console.log(req.headers['authorization']);
    const token = req.headers['authorization'];
    return { User, Post, currentUser: await getUser(token) };
  },
});
// end create Apollo/GraphQL server

// server.
// For more info see: https://nodejs.org/api/net.html#net_server_listen_options_callback
server
  .listen({ port, path: '/' })
  .then(({ url }) => console.log(`🚀 Server listening in ${url} 🦄`));
