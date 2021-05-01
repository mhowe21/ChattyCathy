import React, { useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import { v4 as uuidV4 } from "uuid";
import SignUp from "./SignUp";

export default function Login({ onIdSubmit }) {
  //const idRef = useRef();
  const passRef = useRef();
  const usernameRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [login, { error }] = useMutation(LOGIN);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const mutationResponse = await login({
        variables: { username: usernameRef, password: passRef },
      });
      const ID = mutationResponse.data.login._id;
      console.log(ID);
      onIdSubmit(ID);
    } catch (error) {
      console.log(console.error);
    }
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Container className="align-items-left d-flex" style={{ height: "100vh" }}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" ref={usernameRef} required />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passRef} required />
        </Form.Group>
        <Button type="submit" className="has-background-info-dark mr-2">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">
          Sign Up
        </Button>
        <Button onClick={() => setModalOpen(true)} variant="secondary">
          Sign Up 2
        </Button>
      </Form>

      <Modal show={modalOpen} onHide={closeModal}>
        <SignUp />
      </Modal>
    </Container>
  );
}
