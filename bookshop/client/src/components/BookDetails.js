import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

function BookDetails({ selectedBook }) {
  console.log("selectedBook", selectedBook);
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: selectedBook },
  });

  if (!data?.book) return;
  const { book } = data;

  if (loading) return <p>Loading...</p>;
  if (book) {
    return (
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author?.name ?? ""}</p>
        <p>All books by this author: </p>
        <ul className="other-books">
          {Array.isArray(book.author?.books) &&
            book.author.books.map((bookItem) => {
              return <li key={bookItem.id}>{bookItem.name}</li>;
            })}
        </ul>
      </div>
    );
  }
}

export default BookDetails;
