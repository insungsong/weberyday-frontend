import { gql } from "apollo-boost";

export const FIND_USER = gql`
  query findUser($password: String!) {
    findUser(password: $password) {
      email
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $username: String
    $birthday: String
    $password: String
    $nickname: String
    $nEvent: Boolean
    $agreePrivacy: Boolean
    $actions: ACTIONS!
  ) {
    editUser(
      username: $username
      nickname: $nickname
      birthday: $birthday
      password: $password
      agreePrivacy: $agreePrivacy
      nEvent: $nEvent
      actions: $actions
    )
  }
`;

export const FIND_USER_INFO = gql`
  query findUserInfo {
    findUserInfo {
      email
      username
      birthday
      gender
      nEvent
      certification
      agreePrivacy
    }
  }
`;
