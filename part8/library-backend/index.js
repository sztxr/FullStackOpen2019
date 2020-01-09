const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const JWT_SECRET = 'SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack00@cluster0-ptcko.mongodb.net/library-backend?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB', error.message))

const typeDefs = gql`
  type Book {
    title: String!,
    author: Author!,
    published: Int!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    born: Int,
    id: ID!,
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded : Book!
}
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // * cases must equal to true, not just implicitly true
      //*  !!<condition> converts each case to a Boolean value
      switch (true) {
        case (!!args.author && !!args.genre):
          const authorId = await Author.findOne({ name: args.author }).select('_id')
          return Book.find({ genres: args.genre, author: authorId }).populate('author')
        case (!!args.author):
          const author = await Author.find({ name: args.author }).select('_id')
          return Book.find({ author: author }).populate('author')
        case (!!args.genre):
          return Book.find({ genres: args.genre }).populate('author')
        default:
          return Book.find({}).populate('author')
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async ({ name }) => {
      // name = root.name
      const author = await Author.findOne({ name }).select('_id')
      return Book.find({ author }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = await new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author })

      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: name })
      author.born = setBornTo

      try {
        await author.save()
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return author

      // if (author) {
      //   return Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
      // }
      // return null
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user
        .save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
},
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})