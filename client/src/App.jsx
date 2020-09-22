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
      <div className="app">
        <h1 className="app_title">МОЙ СПИСОК КНИГ</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}
