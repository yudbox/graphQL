import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;
