import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../../../../../Components/Loader";
import { Check, MiniSharing } from "../../../../../Components/Icons";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 80vh;
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
  margin-left: 60px;
`;

const Title = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
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

const SubscriptionAndSharingButton = styled.button`
  width: 45%;
  height: 45px;
  border: none;
  border-radius: 5px;
  color: white;
`;

const SubscriptionBox = styled.div`
  width: 100%;
  margin: 15px 0 15px 0;
  display: flex;
  justify-content: space-around;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default ({
  guestOneOfPost,
  loading,
  onSubmit,
  isSubscription,
  setIsSubscription
}) => {
  const [oneTime, setOneTime] = useState("");
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

  if ((guestOneOfPost && guestOneOfPost.guestOneOfPost) !== undefined) {
    postId = guestOneOfPost.guestOneOfPost.id;
    postDescription = guestOneOfPost.guestOneOfPost.description;
    postEpisodes = guestOneOfPost.guestOneOfPost.episodes; //배열
    postCategory = guestOneOfPost.guestOneOfPost.category;
    postThumbnail = guestOneOfPost.guestOneOfPost.thumbnail;
    postBackgroundImage = guestOneOfPost.guestOneOfPost.backgroundImage;
    postTitle = guestOneOfPost.guestOneOfPost.title;
    postUploadDay = guestOneOfPost.guestOneOfPost.uploadDay;

    //likeCount
    postLikeCount = guestOneOfPost.guestOneOfPost.likes; //배열
  }

  //내가 이 작품에 구독하기를 눌러놓았는지를 알기위한 코드
  guestOneOfPost.guestOneOfPost.subscriber.map((value) => {
    if (oneTime === "") {
      if (value.email === localStorage.getItem("userEmailToken")) {
        setIsSubscription(true);
      }
      setOneTime("End");
    }
  });

  return (
    <>
      {!loading && guestOneOfPost !== undefined ? (
        <Container>
          <BannerBox>
            <img style={{ width: "100%" }} src={postBackgroundImage} />
          </BannerBox>
          <ContentBox>
            <EpisodeBox>
              {postEpisodes.map((episode, index) => (
                <Episode key={episode + index}>
                  <ImageBox>
                    <Link to={`/episodeWatch/${episode.id}`}>
                      <img style={{ width: "100%" }} src={episode.thumbnail} />
                    </Link>
                  </ImageBox>
                  <EpisodeDescription>
                    <Link
                      to={`/episodeWatch/${episode.id}`}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <Title>{episode.title}</Title>
                    </Link>
                    <UploadDay>{episode.createdAt.slice(0, 10)}</UploadDay>
                  </EpisodeDescription>
                </Episode>
              ))}
            </EpisodeBox>
            <DescriptionBox>
              <SubscriptionBox>
                {isSubscription ? (
                  <SubscriptionAndSharingButton
                    style={{ backgroundColor: "#4996C4" }}
                    onClick={async () => {
                      await setIsSubscription(!isSubscription);
                      onSubmit();
                      toast.info("구독이 취소되었습니다.");
                    }}
                  >
                    <IconBox>
                      <p style={{ paddingTop: "4px", paddingRight: "10px" }}>
                        구독중
                      </p>
                      <Check />
                    </IconBox>
                  </SubscriptionAndSharingButton>
                ) : localStorage.getItem("userEmailToken") !== null ? (
                  <SubscriptionAndSharingButton
                    style={{ backgroundColor: "#95a5a6" }}
                    onClick={async () => {
                      await setIsSubscription(!isSubscription);
                      onSubmit();
                      setTimeout(() => {
                        toast.success("구독되었습니다.");
                      }, 1000);
                    }}
                  >
                    구독
                  </SubscriptionAndSharingButton>
                ) : (
                  <SubscriptionAndSharingButton
                    style={{ backgroundColor: "#95a5a6" }}
                    onClick={async () => {
                      toast.warn("로그인이 필요한 기능입니다.");
                    }}
                  >
                    구독
                  </SubscriptionAndSharingButton>
                )}

                <SubscriptionAndSharingButton
                  style={{ backgroundColor: "#4996C4" }}
                >
                  <IconBox>
                    <p style={{ paddingTop: "4px", paddingRight: "10px" }}>
                      공유
                    </p>
                    <MiniSharing />
                  </IconBox>
                </SubscriptionAndSharingButton>
              </SubscriptionBox>

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
      ) : (
        <Loader />
      )}
    </>
  );
};
