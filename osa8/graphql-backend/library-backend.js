const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message);
    });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ) : Book,
     editAuthor(
        name: String!
        setBornTo: Int!
     ) : Author
  }
`;

const resolvers = {
    Query: {
        bookCount: async () => {
            const books = await Book.find({});
            return books.length;
        },
        allBooks: async (root, args) => {
            let books = await Book.find({});

            if (args.author) {
                books = books.filter((book) => book.author === args.author);
            }
            if (args.genre) {
                books = books.filter((book) => book.genres.includes(args.genre));
            }
            return books;
        },
        authorCount: async () => {
            const authors = await Author.find({});
            return authors.length;
        },
        allAuthors: async () => {
            const authors = await Author.find({});
            return authors;
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({ name: args.author });

            if (!author) {
                author = new Author({ name: args.author });
                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError('Saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    });
                }
            }

            const book = new Book({
                title: args.title,
                published: args.published,
                author: author._id,
                genres: args.genres,
            });

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }

            return book;
        },
        editAuthor: async (root, args) => {
            const updatedData = {
                born: args.setBornTo,
            };

            const updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, updatedData, {
                new: true,
            });

            if (!updatedAuthor) return null;

            return updatedAuthor;
        },
    },
    Author: {
        bookCount: async (root) => {
            const bookAmount = await Book.countDocuments({ author: root.id });
            return bookAmount;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
