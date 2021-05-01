import React, { useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function SignUp(onIdSubmit) {
  const idRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" />
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={idRef} />
        </Form.Group>
        <Button onClick={createNewId} variant="secondary">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
