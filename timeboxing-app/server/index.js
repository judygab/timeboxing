const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Note = require('../models/Note');
const { MONGO_URI } = require('../config.js');

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    description: String!
    createdAt: String!
  }
  type Query {
    getNotes: [Note]
  }
`;

const resolvers = {
  Query: {
    async getNotes() {
      try {
        const notes = await Note.find();
        return notes;
      } catch(err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
console.log(MONGO_URI);


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  });

mongoose.connect()
