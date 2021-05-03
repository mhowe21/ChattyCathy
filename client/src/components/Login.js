import React, { useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
// import { v4 as uuidV4 } from "uuid";
import SignUp from "./SignUp";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

export default function Login({ onIdSubmit }) {
  // const idRef = useRef();

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onIdSubmit(idRef.current.value);
  // }

  // function createNewId() {
  //   onIdSubmit(uuidV4());
  // }

  // function closeModal() {
  //   setModalOpen(false);
  // }

  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleFormSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="has-background-info-dark mr-2">
          Login
        </Button>
        {/* <Button onClick={createNewId} variant="secondary mr-2">
          Generate Token
        </Button> */}
        <Button onClick={() => setModalOpen(true)} variant="secondary">
          Sign Up
        </Button>

        <Modal show={modalOpen} onHide={closeModal}>
          <SignUp />
        </Modal>
      </Form>
      <Modal show={modalOpen} onHide={closeModal}>
        <SignUp />
      </Modal>
    </Container>
  );
}
