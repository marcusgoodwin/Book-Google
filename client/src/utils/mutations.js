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
  mutation Mutation(
    $authors: [String]!
    $description: String
    $title: String!
    $bookId: String!
    $image: String
    $link: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      _id
      savedBooks {
        title
        description
      }
    }
  }
`;

export const REMOVE_BOOK_MUTATION = gql`
mutation Mutation($bookId: String!) {
  removeBook(bookId: $bookId) {
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
