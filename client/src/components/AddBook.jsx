import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

export function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation, {
    onCompleted() {},
  });
  const [book, setBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const showAuthors = () => {
    if (loading) {
      return <option disabled>Загрузка авторов...</option>;
    }
    if (error) {
      return <option disabled>Ошибка загрузки авторов</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleChange = (newState) =>
    setBook((prevState) => ({ ...prevState, ...newState }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <h3>ДОБАВИТЬ КНИГУ</h3>
      <div className="add-book_field">
        <label hidden>Название книги</label>
        <input
          type="text"
          required
          placeholder="Название книги"
          value={book.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="add-book_field">
        <label hidden>Жанр</label>
        <input
          type="text"
          required
          placeholder="Жанр"
          value={book.genre}
          onChange={(e) => handleChange({ genre: e.target.value })}
        />
      </div>
      <div className="add-book_field">
        <label hidden>Автор</label>
        <select
          onChange={(e) => handleChange({ authorId: e.target.value })}
          value={book.authorId}
        >
          <option value="">Выберите автора</option>
          {showAuthors()}
        </select>
      </div>
      <button className="add-book_button" type="submit">
        +
      </button>
    </form>
  );
}
