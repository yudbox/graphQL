import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedBook, setSelectedBook] = useState(null);
  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <ul id="book-list">
        {data?.books.map((book) => {
          return (
            <li key={book.id} onClick={() => setSelectedBook(book.id)}>
              {book.name}
            </li>
          );
        })}
      </ul>
      {selectedBook && <BookDetails selectedBook={selectedBook} />}
    </div>
  );
}

export default BookList;
