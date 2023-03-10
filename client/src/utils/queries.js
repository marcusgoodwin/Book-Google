import gql from 'graphql-tag';

// queries for logged in users
export const GET_ME = gql`
query Query {
  me {
    _id
    bookCount
    email
    savedBooks {
      authors
      title
      bookId
      description
      image
      link
    }
    username
  }
}

`;