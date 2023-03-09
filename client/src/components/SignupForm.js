import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER_MUTATION } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ 
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error, data }] = useMutation(ADD_USER_MUTATION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await addUser({
          variables: { ...userFormData }
        });
        Auth.login(data.addUser.token);
      } catch (err) {
        console.error(err);
      }
    }

    setUserFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit}>
        {error && (
          <Alert variant="danger">
            {error?.message || "Something went wrong with your signup!"}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            value={userFormData.username}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            value={userFormData.email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            value={userFormData.password}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          disabled={!userFormData.username || !userFormData.email || !userFormData.password}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
