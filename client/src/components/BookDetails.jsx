import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

export function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });

  const showBookDetails = () => {
    if (loading) return <div>Loading book details...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (data) {
      const book = data.book;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>
            {book.author.name} ({book.author.age} years old)
          </p>
          <p>Other author's books:</p>
          <ul className="other-books">
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };

  return <div id="book-details">{showBookDetails()}</div>;
}
