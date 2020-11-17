import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const app = express();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`);
});
