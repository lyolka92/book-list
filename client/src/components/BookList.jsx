import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

import { BookDetails } from "./BookDetails";

export function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBook, selectBook] = useState("");

  const showBooks = () => {
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (data)
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            id={book.id}
            onClick={(e) => {
              selectBook(e.target.id);
            }}
          >
            {book.name}
          </li>
        );
      });
  };

  return (
    <div>
      <ul id="book-list">{showBooks()}</ul>
      {selectedBook && <BookDetails bookId={selectedBook} />}
    </div>
  );
}
