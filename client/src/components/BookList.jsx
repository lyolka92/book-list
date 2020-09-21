import React from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

export function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  const showBooks = () => {
    if (loading) {
      return <p>Loading books...</p>;
    } else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{showBooks()}</ul>
    </div>
  );
}
