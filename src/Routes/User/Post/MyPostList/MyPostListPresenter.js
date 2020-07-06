import React from "react";
import styled from "styled-components";
import { Plus } from "../../../../Components/Icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MainTitle = styled.h1`
  font-size: 2em;
  margin: 20px 0 30px 0;
`;

const PostList = styled.div`
  width: 100%;
  display: grid;
  grid-template: auto / repeat(5, 1fr);
  grid-gap: 10px;
`;

const Post = styled.div`
  width: 100%;
  height: 150px;
  background: ${(props) => props.theme.lightGreyColor};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PostTitle = styled.p`
  font-size: 1.2em;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({}) => {
  const myPosts = [1, 2, 3, 4, 5];
  return (
    <Container>
      <MainTitle>내 작품</MainTitle>
      <PostList>
        {myPosts.map((post) => (
          <Link key={post} to="/">
            <Post key={post}>
              <ThumbnailBox>
                <Plus />
              </ThumbnailBox>
              <PostTitle>{post}</PostTitle>
            </Post>
          </Link>
        ))}
        <Link to="/UploadPost">
          <Post>
            <ThumbnailBox>
              <Plus />
            </ThumbnailBox>
            <PostTitle>작품을 등록해주세요.</PostTitle>
          </Post>
        </Link>
      </PostList>
    </Container>
  );
};
