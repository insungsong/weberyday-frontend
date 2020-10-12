import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Trophy } from "../../../../../Components/Icons";

const Container = styled.div`
  width: 80%;
  height: 80vh;
`;

const BannerBox = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 5vh;
  display: flex;
  overflow: hidden;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 80px;
  grid-column-gap: 30px;
`;

const OnePostBox = styled.div`
  width: 100%;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.1);
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const PostTitle = styled.p`
  font-size: 120%;
  margin: 25px;
  padding-bottom: 20px;
`;

const BannerImgBox = styled.div`
  display: flex;
  padding: 0 20px;
`;

const CategoryTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0 30px 0;
`;

const CategoryTitle = styled.p`
  font-size: 20px;
`;

export default ({ data }) => {
  const postRankArr = [];
  let bincan;
  data.allPost.map((post, index) => {
    let fakePostId = post.id;
    let fakeHitCount = 0;

    let fakeArr = [];

    post.episodes.map((episode) => {
      fakeHitCount += episode.hitCount;
    });
    postRankArr.push({
      fakePostId,
      fakeHitCount,
      thumbnail: post.thumbnail,
      title: post.title
    });
  });

  postRankArr.map((value, index) => {
    if (index !== postRankArr.length - 1) {
      if (
        postRankArr[index].fakeHitCount < postRankArr[index + 1].fakeHitCount
      ) {
        bincan = postRankArr[index];
        postRankArr[index] = postRankArr[index + 1];
        postRankArr[index + 1] = bincan;
      }
    }
  });
  return (
    <Container>
      <CategoryTitleBox>
        <Trophy />
        <CategoryTitle style={{ paddingTop: "5px", paddingLeft: "10px" }}>
          랭킹리스트
        </CategoryTitle>
      </CategoryTitleBox>
      <PostList>
        {postRankArr.map((post, index) => {
          let countTitle = post.title.length;
          return (
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={`/episodeList/${post.fakePostId}`}
              key={post.fakePostId}
            >
              <OnePostBox>
                <PostThumbnail src={post.thumbnail} />
                {countTitle > 11 ? (
                  <PostTitle>{post.title.substring(0, 12)}...</PostTitle>
                ) : (
                  <PostTitle>{post.title}</PostTitle>
                )}
              </OnePostBox>
            </Link>
          );
        })}
      </PostList>
    </Container>
  );
};
