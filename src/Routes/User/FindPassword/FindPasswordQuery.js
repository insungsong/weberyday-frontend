import { gql } from "apollo-boost";

export const CHECK_USER_EMAIL = gql`
  query checkUserEmail($email: String!) {
    checkUserEmail(email: $email) {
      email
      inflow
    }
  }
`;

export const USER_SECRET_KEY_UPDATE = gql`
  mutation userSecretKeyUpdate($email: String!) {
    userSecretKeyUpdate(email: $email)
  }
`;

export const FIND_PASSWORD_CONFIRM_SECRET = gql`
  mutation findPasswordConfirmSecret($email: String!, $secretCode: String!) {
    findPasswordConfirmSecret(email: $email, secretCode: $secretCode)
  }
`;

export const USER_PASSWORD_UPDATE = gql`
  mutation userPasswordUpdate($email: String!, $password: String!) {
    userPasswordUpdate(email: $email, password: $password)
  }
`;
