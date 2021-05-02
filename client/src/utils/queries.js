import gql from "graphql-tag";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      username
    }
  }
`;

export const QUERY_USERS = gql`
users {
    email
    username
    _id
  }
`;
