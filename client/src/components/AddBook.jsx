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
      return <option disabled>Loading authors...</option>;
    }
    if (error) {
      return <option disabled>Can't load authors</option>;
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
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          required
          value={book.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          required
          value={book.genre}
          onChange={(e) => handleChange({ genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => handleChange({ authorId: e.target.value })}
          value={book.authorId}
        >
          <option value="">Select author</option>
          {showAuthors()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}
