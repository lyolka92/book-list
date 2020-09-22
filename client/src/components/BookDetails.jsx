import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

export function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });

  const showBookDetails = () => {
    if (!props.bookId) return <p className="message">Выберите книгу</p>;

    if (loading)
      return <p className="message">Загрузка информации о книге...</p>;
    if (error)
      return (
        <p className="message">Ошибка загрузки информации: {error.message}</p>
      );

    if (data) {
      const book = data.book;
      return (
        <div>
          <div className="book-details_general">
            <h2 className="book-details_general_name">{book.name}</h2>
            <p className="book-details_general_genre">{book.genre}</p>
          </div>
          <div className="book-details_author">
            <h3 className="book-details_author_name">{book.author.name}</h3>
            <p className="book-details_author_age">
              Возраст: {book.author.age}
            </p>
            <p>Другие книги автора в списке:</p>
            <ul className="other-books">
              {book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  };

  return <aside className="book-details">{showBookDetails()}</aside>;
}
