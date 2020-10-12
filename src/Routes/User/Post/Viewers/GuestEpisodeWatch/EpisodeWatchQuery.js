import { gql } from "apollo-boost";

export const SEARCH_ONE_OF_EPISODE = gql`
  query searchEpisode($episodeId: String!) {
    searchEpisode(episodeId: $episodeId) {
      id
      likes {
        id
        user {
          id
        }
        post {
          id
        }
        comment {
          id
        }
      }
      post {
        id
      }
      title
      description
      file
      comments {
        id
        user {
          email
          username
        }
        text
        createdAt
      }
      hitCount
      createdAt
    }
  }
`;

export const GUEST_SEARCH_ONE_OF_EPISODE = gql`
  query searchEpisode($episodeId: String!) {
    searchEpisode(episodeId: $episodeId) {
      id
      likes {
        id
        post {
          id
        }
        comment {
          id
        }
      }
      post {
        id
      }
      title
      description
      file
      comments {
        id
        user {
          email
          username
        }
        text
        createdAt
        likes {
          id
          user {
            id
            email
          }
        }
        unlikes {
          id
          user {
            id
            email
          }
        }
      }
      hitCount
      createdAt
    }
  }
`;

export const CURRENT_EPISODE_HITCOUNT_UPDATE = gql`
  mutation hitCountUpdateEpisode($episodeId: String!) {
    hitCountUpdateEpisode(episodeId: $episodeId)
  }
`;

export const UPLOAD_COMMENT = gql`
  mutation uploadComment($text: String!, $episodeId: String!) {
    uploadComment(text: $text, episodeId: $episodeId)
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment(
    $episodeId: String!
    $commentId: String!
    $text: String
    $actions: ACTIONS!
  ) {
    editComment(
      episodeId: $episodeId
      commentId: $commentId
      text: $text
      actions: $actions
    )
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($episodeId: String, $commentId: String) {
    toggleLike(episodeId: $episodeId, commentId: $commentId)
  }
`;
