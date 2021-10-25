const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./schema");
const muscleDatabase = require("./datasources/muscle");
const knexConfig = {
  client: "postgresql",
  connection: {
    host: "database-1.c7lrskovehxm.us-east-2.rds.amazonaws.com",
    user: "postgres",
    password: "superman95",
    database: "database-1"
  }
};
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Muscle {
    id: ID!
    Name: String
    Description: String
    Video: []
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Video {
    id: ID!
    ImageLink: String
    Name: String
    Description: String 
    VideoLink: String
  }
  type Query {
    muscle: [Muscle]!
    muscle(id: ID!): Muscle
    videos:[Video]!
    video(id: ID!): Video
  }
`;

module.exports = typeDefs;

const server = new ApolloServer({
  typeDefs,
  datasources: () => ({
    muscleDatabase: new muscleDatabase(knexConfig)
  })
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
