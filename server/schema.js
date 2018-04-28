const { makeExecutableSchema } = require('graphql-tools');

// Import data
const books = [
  {
    title: '1984',
    author: 'George Orwell'
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury'
  }
];

// Define Types of Data and Query and Resolvers
const typeDefs = `
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): [Book]
  }

  type Book {
    title: String,
    author: String
  }
`;

// Define the resolvers for these types
const resolvers = {
  Query: {
    books: () => books
  },

  Mutation: {
    async addBook(root, args, ctx) {
      books.push({
        title: args.title,
        author: args.author
      });
      return books;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema: schema };
