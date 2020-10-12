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
    $gender: String
    $nickname: String
    $nEvent: Boolean
    $agreePrivacy: Boolean
    $email: String
    $signOutReason: String
    $actions: ACTIONS!
  ) {
    editUser(
      username: $username
      nickname: $nickname
      birthday: $birthday
      gender: $gender
      password: $password
      agreePrivacy: $agreePrivacy
      nEvent: $nEvent
      email: $email
      signOutReason: $signOutReason
      actions: $actions
    )
  }
`;

export const FIND_USER_INFO = gql`
  query findUserInfo {
    findUserInfo {
      id
      email
      teamName
      username
      birthday
      gender
      nEvent
      certification
      agreePrivacy
      inflow
      posts {
        id
        title
        description
        uploadDay
        thumbnail
        likes {
          id
        }
        category {
          id
        }
        broadcast
      }
      likes {
        id
      }
      unlikes {
        id
      }
    }
  }
`;
