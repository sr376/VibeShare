const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const typeDefs = require('./resolvers/typeDefs');
const resolvers = require('./resolvers');

const MONGODB = 'your_mongodb_connection_string_here';

const pubsub = new PubSub();

const app = express();
const server = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

(async () => {
  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req, pubsub }),
    })
  );

  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });

  useServer({ schema: apolloServer.schema }, wsServer);

  mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected');
      return server.listen({ port: 5000 });
    })
    .then(() => {
      console.log('Server running at http://localhost:5000/graphql');
    })
    .catch((err) => {
      console.error(err);
    });
})();

