// const  required packages and modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const  path = require('path');
const {authMiddleware} = require('./utils/auth');
const connect = require('./config/connection');
const  { typeDefs, resolvers } = require('./schema/index');

// Create an Express app instance
const app = express();

// Define the server port
const PORT = process.env.PORT || 3001;

// Create an Apollo server instance with type definitions, resolvers and context middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Middleware to parse incoming request bodies as JSON
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve the static files in the client build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Route to serve the client application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the Apollo server and MongoDB database connection
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  connect.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
};

// Call the startServer function to start the server
startApolloServer(typeDefs, resolvers);