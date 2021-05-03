import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
<<<<<<< HEAD
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
=======
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $String, email: $email, password: $password) {
>>>>>>> dc83031
      token
      user {
        _id
      }
    }
  }
`;
