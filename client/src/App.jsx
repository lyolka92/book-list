import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";

import { BookList } from "./components/BookList";
import { AddBook } from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Olga's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}
