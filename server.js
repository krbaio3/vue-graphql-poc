const {
    ApolloServer,
    gql
} = require('apollo-server');
const {connect} = require('mongoose');

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

connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log('DB connected')).catch(err => console.error(err));


const todos = [{
        task: 'learn graphql',
        completed: false
    },
    {
        task: 'learn vue',
        completed: true
    },
    {
        task: 'learn vuex',
        completed: true
    }
];

const typeDefs = gql `

type Todo {
    task: String
    completed: Boolean
}

type Query {
    getTodos: [Todo]
}

type Mutation {
    addTodo(task: String, completed: Boolean): Todo
}

`;

const resolvers = {
    Query: {
        getTodos: () => todos,
    },
    Mutation: {
        addTodo: (_, args) => {
            const todo = {
                task: args.task,
                completed: args.completed
            };
            todos.push(todo);
            return todo;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(4000).then(({
    url
}) => console.log(`🚀 Server listening in ${url} 🦄`));