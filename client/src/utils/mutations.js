import { gql } from "@apollo/client";

const bookFields = `
  title
  authors
  description
  image
  bookId
  link
`;

export const ADD_USER_MUTATION = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          ${bookFields}
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          ${bookFields}
        }
      }
    }
  }
`;

export const SAVE_BOOK_MUTATION = gql`
  mutation SaveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        ${bookFields}
      }
    }
  }
`;

export const REMOVE_BOOK_MUTATION = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        ${bookFields}
      }
    }
  }
`;