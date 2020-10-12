import { gql } from "apollo-boost";

export const SEARCH_TEAM_NAME = gql`
  query searchTeamName($teamName: String!) {
    searchTeamName(teamName: $teamName)
  }
`;

export const TEAM_NAME_UPLOAD = gql`
  mutation uploadTeamName($teamName: String!) {
    uploadTeamName(teamName: $teamName)
  }
`;
