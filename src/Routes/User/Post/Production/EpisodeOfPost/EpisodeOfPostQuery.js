import { gql } from "apollo-boost";

export const ONE_OF_POST = gql`
  query oneOfPost($id: String!) {
    oneOfPost(id: $id) {
      id
      teamName {
        id
        email
        teamName
      }
      likes {
        id
      }
      episodes {
        id
        likes {
          id
        }
        title
        thumbnail
        file
        hitCount
        endTime
        createdAt
      }
      title
      description
      uploadDay
      thumbnail
      backgroundImage
      s3ThumbnailId
      s3BackgroundImageId
      category {
        id
        genre
      }
      createdAt
      broadcast
    }
  }
`;
