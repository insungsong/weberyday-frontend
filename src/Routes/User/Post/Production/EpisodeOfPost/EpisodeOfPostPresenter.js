import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../../../../../Components/Loader";

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 120vh;
  flex-direction: column;
`;

const BannerBox = styled.div``;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DescriptionBox = styled.div`
  width: 25%;
`;

const Description = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  padding: 30px 10px;
  border-radius: 5px;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Category = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  padding: 30px 10px;
  border-radius: 5px;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EpisodeBox = styled.div`
  width: 73%;
`;

const Episode = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgrey;
  border-bottom: none;
  :last-child {
    border-bottom: 1px solid lightgrey;
  }
`;

const EpisodeDescription = styled.div`
  margin-left: 20px;
`;

const Title = styled.p`
  font-size: 1.2em;
  margin-bottom: 8px;
  font-weight: bold;
`;

const ModifyButton = styled.button`
  background: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-size: 1em;
  left: 60%;
  position: sticky;
  padding: 10px 30px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.favoriteColor};
    p {
      color: white;
    }
  }
`;

const UploadDay = styled.p``;

const ImageBox = styled.div`
  width: 25%;
`;

const ModifyButtonFormBox = styled.div`
  background: none;
  border-radius: 5px;
  font-size: 1em;
  left: 60%;
  position: sticky;
`;

const PostTitle = styled.p``;

export default ({ oneOfPost, loading, refetch, render, setRender }) => {
  let postId = "";
  let postDescription = "";
  let postEpisodes = [];
  let postCategory = [];
  let teamName = "";
  let postThumbnail = "";
  let postBackgroundImage = "";
  let postTitle = "";
  let postUploadDay = "";
  let postLikeCount = "";

  if ((oneOfPost && oneOfPost.oneOfPost) !== undefined) {
    postId = oneOfPost.oneOfPost.id;
    postDescription = oneOfPost.oneOfPost.description;
    postEpisodes = oneOfPost.oneOfPost.episodes; //배열
    postCategory = oneOfPost.oneOfPost.category;
    teamName = oneOfPost.oneOfPost.teamName.teamName;
    postThumbnail = oneOfPost.oneOfPost.thumbnail;
    postBackgroundImage = oneOfPost.oneOfPost.backgroundImage;
    postTitle = oneOfPost.oneOfPost.title;
    postUploadDay = oneOfPost.oneOfPost.uploadDay;

    //likeCount
    postLikeCount = oneOfPost.oneOfPost.likes; //배열
  }

  useEffect(() => {
    //작품을 업로드했을때 oneOfPost에 새로운 값이 들어오면 다시 render해주기 위함
    if (render === "render") {
      window.location.reload();
      setRender("");
    }
    refetch();
  }, [oneOfPost]);

  return (
    <>
      {loading && oneOfPost === undefined ? (
        <Loader />
      ) : (
        <Container>
          <BannerBox>
            <img style={{ width: "100%" }} src={postBackgroundImage} />
          </BannerBox>
          <ContentBox>
            <EpisodeBox>
              {postEpisodes.map((episode, index) => (
                <Episode key={episode + index}>
                  <ImageBox>
                    <img style={{ width: "100%" }} src={episode.thumbnail} />
                  </ImageBox>
                  <EpisodeDescription>
                    <Title>{episode.title}</Title>
                    <UploadDay>{episode.createdAt.slice(0, 10)}</UploadDay>
                  </EpisodeDescription>
                  <ModifyButtonFormBox>
                    <Link
                      onClick={() => setTimeout(() => window.location.reload())}
                      to={`/episodeUpdate/${episode.id}`}
                      key={index}
                    >
                      <ModifyButton>
                        <p>수정</p>
                      </ModifyButton>
                    </Link>
                  </ModifyButtonFormBox>
                </Episode>
              ))}
              <Episode style={{ justifyContent: "center" }}>
                <Link
                  to={`/episodeUpload/${postId}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <EpisodeDescription
                    style={{
                      padding: "30px 10px"
                    }}
                  >
                    <Title style={{ fontWeight: "bold" }}>
                      새로운 회차를 등록하세요 ➕
                    </Title>
                  </EpisodeDescription>
                </Link>
              </Episode>
            </EpisodeBox>
            <DescriptionBox>
              <Description>
                <Title>작품정보 수정</Title>
                {oneOfPost && oneOfPost.oneOfPost !== undefined ? (
                  <Link to={`/myPostUpdate/${postId}`}>
                    <PostTitle
                      style={{
                        fontWeight: "bold",
                        color: "#4996c4",
                        textDecoration: "inherit"
                      }}
                    >
                      바로 가기
                    </PostTitle>
                  </Link>
                ) : (
                  <p>바로 가기</p>
                )}
              </Description>
              <Description>
                <Title>줄거리</Title>
                {postDescription}
              </Description>

              <Category>
                <Title>장르</Title>
                {postCategory.genre}
              </Category>
            </DescriptionBox>
          </ContentBox>
        </Container>
      )}
    </>
  );
};
