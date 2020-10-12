import { gql } from "apollo-boost";

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $title: String!
    $description: String!
    $uploadDay: [String!]
    $thumbnail: String!
    $backgroundImage: String!
    $s3ThumbnailId: String
    $s3BackgroundImageId: String
    $category: String
    $broadcast: Boolean!
    $action: ACTIONS!
  ) {
    editPost(
      id: $id
      title: $title
      description: $description
      uploadDay: $uploadDay
      thumbnail: $thumbnail
      backgroundImage: $backgroundImage
      s3ThumbnailId: $s3ThumbnailId
      s3BackgroundImageId: $s3BackgroundImageId
      category: $category
      broadcast: $broadcast
      action: $action
    )
  }
`;
