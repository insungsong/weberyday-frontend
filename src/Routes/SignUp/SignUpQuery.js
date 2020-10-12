import { gql } from "apollo-boost";

export const IS_EXIST_KEEP_USER = gql`
  query isExistKeepUser($email: String!) {
    isExistKeepUser(email: $email)
  }
`;

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secretCode: String!) {
    confirmSecret(email: $email, secretCode: $secretCode)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $password: String!
    $inflow: String!
    $ageRange: String
    $birthday: String
    $certification: Boolean
    $nickname: String
    $gender: String
    $nEvent: Boolean!
    $status: String
    $rank: String!
    $agreePrivacy: Boolean
  ) {
    createAccount(
      email: $email
      password: $password
      inflow: $inflow
      ageRange: $ageRange
      birthday: $birthday
      certification: $certification
      nickname: $nickname
      gender: $gender
      nEvent: $nEvent
      status: $status
      rank: $rank
      agreePrivacy: $agreePrivacy
    )
  }
`;
