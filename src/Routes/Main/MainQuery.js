import { gql } from "apollo-boost";

export const ALL_POST = gql`
  query allPost {
    allPost {
      id
      likes {
        id
      }
      episodes {
        id
        hitCount
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
      broadcast
    }
  }
`;

export const ALL_BANNER = gql`
  query allBanner {
    allBanner {
      id
      image
      url
      upload
      orderBy
      uploadTime
      downTime
    }
  }
`;

export const KAKAO_EMAIL_IN_THE_USER_INFORMATION_DB = gql`
  mutation kakaoEmailInTheUserInfomation($email: String) {
    kakaoEmailInTheUserInfomation(email: $email)
  }
`;

export const NAVER_EMAIL_IN_THE_USER_INFORMATION_DB = gql`
  mutation naverEmailInTheUserInfomation($email: String) {
    naverEmailInTheUserInfomation(email: $email)
  }
`;

export const FACEBOOK_EMAIL_IN_THE_USER_INFORMATION_DB = gql`
  mutation facebookEmailInTheUserInfomation($email: String) {
    facebookEmailInTheUserInfomation(email: $email)
  }
`;

export const INFOW_FIND_USER = gql`
  query inflowFindUser($email: String) {
    inflowFindUser(email: $email) {
      email
      inflow
    }
  }
`;
