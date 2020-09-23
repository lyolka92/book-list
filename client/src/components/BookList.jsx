import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

import { BookDetails } from "./BookDetails";

export function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBook, selectBook] = useState(null);

  const showBooks = () => {
    if (loading) return <p>Загрузка списка книг...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    if (data)
      return data.books.map((book) => {
        return (
          <li
            className="book-list_item"
            key={book.id}
            onClick={() => {
              selectBook(book.id);
            }}
          >
            <button>{book.name}</button>
          </li>
        );
      });
  };

  return (
    <div className="book-info">
      <ul className="book-list">{showBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
}
