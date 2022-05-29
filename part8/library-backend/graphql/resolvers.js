const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Book = require('../models/book')
const Author = require('../models/author')

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({
          $and: [
            { author: { $in: author._id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: author._id } }).populate(
          'author'
        )
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        )
      }

      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      return authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author.id,
        }
      })
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let book
      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
          })
        }

        book = new Book({ ...args, author })
        author.books = author.books.concat(book)

        await author.save()
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
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
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = { resolvers }
