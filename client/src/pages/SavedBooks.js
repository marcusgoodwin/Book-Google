import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK_MUTATION } from '../utils/mutations';


const SavedBooks = () => {
  const [loading, setLoading] = useState(true);

  const [
    deleteBook, {error}
  ] = useMutation(REMOVE_BOOK_MUTATION)

  const {data} = useQuery(GET_ME);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (data) {
      setUserData(data.me);
      setLoading(false);
    }
  }, [data]);

  const handleDeleteBook = async (bookId) => {
    try {
      const token = Auth.getToken();

      if (!token) {
        throw new Error('No token found!');
      }

      const response = await deleteBook({variables: {bookId}});

      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => (
            <Col md='4' key={book?.bookId || 'nothing'}>
              {console.log(book)}
              <Card border='dark'>
                {book?.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book?.title}</Card.Title>
                  <p className='small'>Authors: {book?.authors}</p>
                  <Card.Text>{book?.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book?.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

