import React, { useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
// import { v4 as uuidV4 } from "uuid";
import { useMutation } from "@apollo/client";

export default function SignUp(props) {
  // const idRef = useRef();
  // const [modalOpen, setModalOpen] = useState(false);

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onIdSubmit(idRef.current.value);
  // }

  // function createNewId() {
  //   onIdSubmit(uuidV4());
  // }

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        userName: formState.userName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className="align-items-center d-flex" style={{ height: "50vh" }}>
      <Form onSubmit={handleFormSubmit} className="w-100">
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            placeholder="userName"
            name="userName"
            type="text"
            id="userName"
            onChange={handleChange}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />

          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            // ref={idRef}
          />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}
