import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "../queries/queries";

function AddBook() {
  const { loading, data } = useQuery(GET_AUTHORS);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  console.log("ADD_BOOK", ADD_BOOK);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: GET_BOOKS }, // DocumentNode object parsed with gql
      "GetBooks", // Query name
    ],
  });

  const submitForm = (e) => {
    e.preventDefault();

    addBook({ variables: { name, genre, authorId } });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Select authors</option>
          {loading ? (
            <option disabled value="Loading authors ...">
              {"Loading authors ... "}
            </option>
          ) : (
            data?.authors.map((author) => {
              return (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
