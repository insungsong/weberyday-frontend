import { gql } from "apollo-boost";

export const FIND_EPISODE_REPORT_CATEGORY = gql`
  query findEpisodeReportCategory($category: String!) {
    findEpisodeReportCategory(category: $category) {
      id
      category
      reason
    }
  }
`;

export const EPISODE_OF_REPORT = gql`
  mutation uploadReport(
    $offenderId: String
    $episodeId: String
    $text: String
    $reportCategory: String!
  ) {
    uploadReport(
      offenderId: $offenderId
      episodeId: $episodeId
      text: $text
      reportCategory: $reportCategory
    )
  }
`;

// export const FIND_EPISODE_OF_COMMENT = gql``;
