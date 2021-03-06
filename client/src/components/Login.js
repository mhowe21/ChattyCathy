import React, { useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import SignUp from "./SignUp";

export default function Login({ onIdSubmit }) {
  const idRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" ref={idRef} />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
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
