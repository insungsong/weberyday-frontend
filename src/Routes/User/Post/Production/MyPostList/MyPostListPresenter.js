import React from "react";
import styled from "styled-components";
import { Plus } from "../../../../../Components/Icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 80vh;
`;

const MainTitle = styled.h1`
  font-size: 2em;
  margin: 20px 0 30px 0;
`;

const PostList = styled.div`
  width: 100%;
  display: grid;
  grid-template: auto / repeat(5, 1fr);
  grid-gap: 30px;
`;

const Post = styled.div`
  width: 100%;
  height: 150px;
  background: ${(props) => props.theme.lightGreyColor};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const PostTitle = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 1.2em;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnePostBox = styled.div`
  width: 100%;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: 180px;
  z-index: 1;
`;

const PostTitleFont = styled.p`
  font-size: 100%;
  margin: 20px;
  color: black;
`;

export default ({ postData, error, refetch }) => {
  if (error) {
    window.location.href = "/";
  }
  refetch();
  let myPostList = [];

  if (
    (postData && postData.findUserInfo && postData.findUserInfo.posts) !==
    undefined
  ) {
    myPostList = postData.findUserInfo.posts;
  }

  return (
    <Container>
      <MainTitle>내 작품</MainTitle>
      <PostList>
        {myPostList.map((post) => (
          <OnePostBox>
            <Link key={post.id} to={`/myPostList/${post.id}`}>
              <Post key={post.id}>
                <ThumbnailBox>
                  <PostThumbnail src={post.thumbnail} />
                </ThumbnailBox>
              </Post>
              <PostTitleFont>{post.title}</PostTitleFont>
            </Link>
          </OnePostBox>
        ))}

        <OnePostBox>
          <Link to="/postUpload">
            <Post>
              <ThumbnailBox>
                <Plus />
              </ThumbnailBox>
            </Post>

            <PostTitleFont>작품을 등록해주세요.</PostTitleFont>
          </Link>
        </OnePostBox>
      </PostList>
    </Container>
  );
};
