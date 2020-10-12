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
      category {
        id
        genre
      }
      createdAt
      broadcast
    }
  }
`;

export const GUEST_ONE_OF_POST = gql`
  query guestOneOfPost($id: String!) {
    guestOneOfPost(id: $id) {
      id
      teamName {
        id
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
      category {
        id
        genre
      }
      subscriber {
        id
        email
      }
      createdAt
      broadcast
    }
  }
`;

export const SUBSCRIPTION_POST = gql`
  mutation subscriptionPost($postId: String!) {
    subscriptionPost(postId: $postId)
  }
`;
