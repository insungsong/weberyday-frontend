import { gql } from "apollo-boost";

export const MY_SUBSCRIPTION_POST_LIST = gql`
  query findSubscriptionPost {
    findSubscriptionPost {
      id
      title
      thumbnail
    }
  }
`;
