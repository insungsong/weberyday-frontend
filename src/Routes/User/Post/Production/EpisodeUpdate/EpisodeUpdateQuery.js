import { gql } from "apollo-boost";

export const SEARCH_EPISODE = gql`
  query searchEpisode($episodeId: String!) {
    searchEpisode(episodeId: $episodeId) {
      id
      post {
        id
      }
      likes {
        id
      }
      title
      description
      thumbnail
      s3ThumbnailId
      s3FileId
      file
      comments {
        id
      }
      hitCount
      endTime
      viewed {
        id
      }
    }
  }
`;

export const EDIT_EPISODE = gql`
  mutation editEpisode(
    $episodeId: String!
    $title: String!
    $description: String!
    $thumbnail: String!
    $file: String!
    $s3ThumbnailId: String
    $s3FileId: String
    $actions: ACTIONS!
  ) {
    editEpisode(
      episodeId: $episodeId
      title: $title
      description: $description
      thumbnail: $thumbnail
      file: $file
      s3ThumbnailId: $s3ThumbnailId
      s3FileId: $s3FileId
      actions: $actions
    )
  }
`;
