const graphql = require("graphql");
let _ = require("lodash")
const Book = require("../models/book")
const Author = require("../models/author")
const {GraphQLObjectType,
     GraphQLString,
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } = graphql;

const bookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
          type: authorType,
          resolve(parent, args){
            console.log(parent);
            // return _.find(authors, {id: parent.authorId});
            return Author.findById(parent.authorId);
          }
          
      }
    })
})

const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      age: {type: GraphQLInt},
      books: {
          type: new GraphQLList(bookType),
          resolve(parent, args){
            //   return _.filter(books, {authorId: parent.id});
            return Book.find({authorId: parent.id});
          }
      }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: bookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
            //    Code to get data from db/other source
            //   return _.find(books,{id: args.id});
            return Book.findById(args.id);
            }
        },
        author: {
            type: authorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(bookType),
            resolve(parent, args){
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(authorType),
            resolve(parent, args){
                // return authors;
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: authorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(paren, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: bookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});