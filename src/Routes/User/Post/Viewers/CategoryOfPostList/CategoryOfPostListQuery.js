import { gql } from "apollo-boost";

export const FIND_CATEGORY = gql`
  query findCategory {
    findCategory {
      id
      genre
    }
  }
`;
