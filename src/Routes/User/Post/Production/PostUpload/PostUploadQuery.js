import { gql } from "apollo-boost";

export const FIND_CATEGORY = gql`
  query findCategory {
    findCategory {
      id
      genre
    }
  }
`;

export const UPLOAD_POST = gql`
  mutation uploadPost(
    $title: String!
    $description: String!
    $thumbnail: String!
    $backgroundImage: String!
    $s3ThumbnailId: String
    $s3BackgroundImageId: String
    $category: String
    $broadcast: Boolean!
    $uploadDay: [String!]
  ) {
    uploadPost(
      title: $title
      description: $description
      thumbnail: $thumbnail
      backgroundImage: $backgroundImage
      s3ThumbnailId: $s3ThumbnailId
      s3BackgroundImageId: $s3BackgroundImageId
      category: $category
      broadcast: $broadcast
      uploadDay: $uploadDay
    )
  }
`;
