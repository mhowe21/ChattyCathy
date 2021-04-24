const express = require("express");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const path = require("path");

// import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { isObjectType } = require("graphql");

const PORT = process.env.PORT || 3030;
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// integrate Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static asset here

db.once("open", () => {
  http.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

//socket io
io.on("connection", (socket) => {
  console.log("new client connected");
});
