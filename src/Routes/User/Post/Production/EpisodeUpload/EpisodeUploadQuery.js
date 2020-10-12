import { gql } from "apollo-boost";

export const UPLOAD_EPISODE = gql`
  mutation uploadEpisode(
    $postId: String!
    $title: String!
    $description: String
    $thumbnail: String!
    $file: String!
    $s3ThumbnailId: String
    $s3FileId: String
    $endTime: Int
  ) {
    uploadEpisode(
      postId: $postId
      title: $title
      description: $description
      thumbnail: $thumbnail
      file: $file
      s3ThumbnailId: $s3ThumbnailId
      s3FileId: $s3FileId
      endTime: $endTime
    )
  }
`;
