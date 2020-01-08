# Full Stack Open 2019 &mdash; GraphQL Exercise
### **library-backend** with *GraphQL*

#### &mdash; Start GraphQL-playground: `npm start`

## Queries
#### &mdash; return the number of books and the number of authors
```js
query {
  bookCount
  authorCount
}
```

#### &mdash; return the details of all books / all authors
```js
query {
  allBooks { 
    title 
    published 
    genres
    author {
      name
    }
  }
}

query {
  allAuthors {
    name
    bookCount
  }
}
```

#### &mdash; return the details of all books with optional parameters
```js
// by author
query {
  allBooks(author: "Robert Martin") {
    title
  }
}

// by book
query {
  allBooks(genre: "refactoring") {
    title
    author {
      name
    }
  }
}

// both
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author {
      name
    }
  }
}
```

## Mutations

#### &mdash; A new person can be added with the following mutation
```js
// when author already exist
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author {
      name
    }
  }
}

//when  author is yet to be added to server
mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author {
      name
    }
  }
}
```

#### &mdash; Mutation to set a birth year for an author
```js
mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}
```