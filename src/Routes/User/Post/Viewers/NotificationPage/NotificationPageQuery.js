import { gql } from "apollo-boost";

export const SEARCH_NOTIFICATION = gql`
  query searchNotification {
    searchNotification {
      id
      url
      title
      text
      timeLimit
      timeCreate
    }
  }
`;

export const EDIT_NOTATION = gql`
  mutation editNotification($noficationId: String!, $actions: ACTIONS!) {
    editNotification(noficationId: $noficationId, actions: $actions)
  }
`;
