import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const SIGN_UP_LOGIN = gql`
  mutation signUpLogin($email: String!, $password: String!) {
    signUpLogin(email: $email, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const FIND_USER = gql`
  {
    findUser {
      id
      email
    }
  }
`;
