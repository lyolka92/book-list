import React from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

export function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const showAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>{showAuthors()}</select>
      </div>
      <button>+</button>
    </form>
  );
}
