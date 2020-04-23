import React from 'react';
// import {ApolloClient,ApolloProvider} from "@apollo/client"
import { ApolloClient, HttpLink, InMemoryCache,ApolloProvider } from '@apollo/client';

import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import 'bootswatch/dist/materia/bootstrap.min.css';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })
});
function App() {
  return (
    <ApolloProvider client={client}>
    <div className="container mt-5">
      <h1>Ninja reading list</h1>
      <BookList />
      <AddBook />
    </div>
    </ApolloProvider>
  );
}

export default App;
