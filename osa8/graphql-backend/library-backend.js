const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');

// let authors = [
//     {
//         name: 'Robert Martin',
//         id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//         born: 1952,
//     },
//     {
//         name: 'Martin Fowler',
//         id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//         born: 1963,
//     },
//     {
//         name: 'Fyodor Dostoevsky',
//         id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//         born: 1821,
//     },
//     {
//         name: 'Joshua Kerievsky', // birthyear not known
//         id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//     },
//     {
//         name: 'Sandi Metz', // birthyear not known
//         id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//     },
// ];

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//         genres: ['agile', 'patterns', 'design'],
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'patterns'],
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'design'],
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'crime'],
//     },
//     {
//         title: 'Demons',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'revolution'],
//     },
// ];

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
        // return initializeDb();
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message);
    });

const initializeDb = async () => {
    const existingAuthors = await Author.find({});
    if (existingAuthors.length === 0) {
        await Author.insertMany(authors);
    }
    const exisistingBooks = await Book.find({});
    if (exisistingBooks.length === 0) {
        await Book.insertMany(books);
    }
};

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
        bookCount: () => books.length,
        allBooks: async (root, args) => {
            let filteredBooks = books;

            if (args.author) {
                filteredBooks = filteredBooks.filter((book) => book.author === args.author);
            }
            if (args.genre) {
                filteredBooks = filteredBooks.filter((book) => book.genres.includes(args.genre));
            }
            return filteredBooks;
        },
        authorCount: () => authors.length,
        allAuthors: async () => authors,
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({ name: args.author });

            if (!author) {
                author = new Author({ name: args.author });
                await author.save();
            }

            const book = new Book({
                title: args.title,
                published: args.published,
                author: author._id,
                genres: args.genres,
            });
            await book.save();
            return book.populate('author');
        },
        editAuthor: (root, args) => {
            const author = authors.find((author) => author.name === args.name);

            if (!author) return null;

            const updatedAuthor = { ...author, born: args.setBornTo };

            authors = authors.map((author) => (author.name !== args.name ? author : updatedAuthor));

            return updatedAuthor;
        },
    },
    Author: {
        bookCount: (root) => books.filter((book) => book.author === root.name).length,
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
