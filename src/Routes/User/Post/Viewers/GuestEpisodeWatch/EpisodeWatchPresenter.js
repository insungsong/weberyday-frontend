import React, { useState } from "react";
import styled from "styled-components";
import {
  Like,
  Unlike,
  Sharing,
  ReportIcon,
  ReversArrow,
  NextArrow
} from "../../../../../Components/Icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../../../../Components/Loader";

const Container = styled.div`
  width: 80%;
`;

const VideoBox = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video.attrs({})`
  width: 100%;
  height: 500px;
  background: black;
  margin-top: 20px;
  z-index: 1;
`;

const EpisodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 20px 0;
`;

const Episode = styled.div`
  padding: 10px;
  margin: 10px 0;
`;

const EpisodeListBox = styled.div`
  border-top: 0.5px solid lightgrey;
  border-bottom: 0.5px solid lightgrey;
  margin: 20px 0;
  display: flex;
`;
const NextButton = styled.button`
  border: none;
  background: none;
  margin: 0 5px;
`;
const PreviousButton = styled.button`
  border: none;
  background: none;
  margin: 0 5px;
`;

const ThisEpisode = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid ${(props) => props.theme.favoriteColor};
  border-radius: 10px;
`;

const EpisodeThumbnial = styled.img`
  width: 100%;
`;

const EpisodeTitle = styled.div``;

const DescriptionBox = styled.div`
  margin: 30px 0;
`;

const ActiveBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadDay = styled.div``;

const ButtonBox = styled.div`
  display: flex;
  margin: 10px 0;
`;

const EpisodeButtonBox = styled.div``;

const LikeButton = styled.button`
  background: none;
  border: none;
`;

const SharingButton = styled.button`
  background: none;
  border: none;
`;

const CommentBox = styled.div`
  padding: 30px 30px 30px 10px;
  font-size: 1.1em;
`;

const InputCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 50px;
`;

const CommentPush = styled.button`
  width: 10%;
  background: #4996c4;
  border-radius: 5px;
  border: none;
  color: white;
`;

const Title = styled.p`
  font-size: 1.3em;
  margin: 15px 0;
`;

const Description = styled.p`
  font-size: 1.1em;
  margin-bottom: 10px;
`;

const InputComment = styled.input.attrs({
  type: "text"
})`
  border: none;
  border-bottom: 1px solid lightgrey;
  width: 85%;
  height: 30px;
  font-size: 1.1em;
`;

const CommentViewBox = styled.div``;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  :hover {
    button {
      display: inline;
    }
  }
`;

const TextBox = styled.div``;

const Writer = styled.p`
  margin-bottom: 10px;
`;

const InputDate = styled.p``;

const Report = styled.div``;

const ReportButton = styled.button`
  display: none;
  border: none;
  background: none;
`;

const LikeHome = styled.div`
  display: flex;
  align-items: center;
`;

const LinkeButton = styled.button`
  border: none;
  background: none;
`;

const UnlikeButton = styled.button`
  border: none;
  background: none;
`;
const CommentValue = styled.p``;

export default ({
  episodeData,
  episodeLoading,
  postDate,
  comment,
  hitCountUpdateEpisodeMutation,
  pageList,
  setPageList,
  checkPageList,
  setCheckPageList,
  fakeCommentBucket,
  setFakeCommentBucket
}) => {
  const [changeLayout, setChangeLayout] = useState("Basic");
  const [commentModifyId, setCommentModifyId] = useState("");

  let postDateBox = "";
  if (postDate !== undefined && postDate.guestOneOfPost !== undefined) {
    postDateBox = postDate;
  }

  let commentList = episodeData.searchEpisode.comments;

  let episodeOfCommentLikeDataIdBox = [];
  let commentIdList = [];

  episodeData.searchEpisode.comments.map((value, index) => {
    commentIdList.push(value.id);

    if (value.likes.length !== 0) {
      value.likes.map((commentIdList) => {
        episodeOfCommentLikeDataIdBox.push(commentIdList.id);
      });
    }
  });

  //조회수 +1올리기 위한 코드
  // if (document.getElementById("currentVideo") !== null) {
  //   document.getElementById("currentVideo").addEventListener("ended", () => {
  //     hitCountUpdateEpisodeMutation();
  //   });
  // }
  return (
    <Container>
      <VideoBox>
        <Video
          id="currentVideo"
          controls
          src={episodeData.searchEpisode.file}
          onEnded={() => {
            hitCountUpdateEpisodeMutation();
          }}
        />
      </VideoBox>
      <DescriptionBox>
        <Title>{episodeData.searchEpisode.title}</Title>
        <ActiveBox>
          <TextBox>
            <Description>{episodeData.searchEpisode.description}</Description>
            <UploadDay>
              {episodeData.searchEpisode.createdAt.slice(0, 10)}
            </UploadDay>
          </TextBox>
          <EpisodeButtonBox>
            <LikeButton
              onClick={(e) => {
                toast.warn("회원가입이 필요한 기능입니다🔒");
              }}
            >
              <Like />
            </LikeButton>
            <SharingButton>
              <Sharing />
            </SharingButton>
          </EpisodeButtonBox>
        </ActiveBox>
      </DescriptionBox>

      {postDate !== undefined ? (
        <EpisodeListBox>
          {/* 
            Episode List 페이지 이전버튼 
          */}
          <PreviousButton
            onClick={() => {
              if (pageList !== 5) {
                //pageList는 5단위로 페이지를 구분한다. ex)5 = 1페이지, 10 = 2페이지...
                //첫번째 페이지일 경우 alert을 띄우는 것
                setPageList(pageList - 5);
              } else {
                alert("첫번째 페이지입니다.");
              }
              setCheckPageList("No");
            }}
          >
            <ReversArrow />
          </PreviousButton>
          <EpisodeList>
            {postDate.guestOneOfPost.episodes.map((episode, index) => {
              //해당 에피소드의 아이디와 map으로 돌린 에피소드 아이디가 같으면
              if (
                postDate.guestOneOfPost.episodes[index].id ===
                episodeData.searchEpisode.id
              ) {
                //해당 페이지에 속하는 리스트 페이지를 나타낸다.
                //checkPageList를 통해 처음 들어왔을때만 페이지를 셋팅해준다.
                if (index >= pageList && checkPageList === "Yes") {
                  setPageList(pageList + 5);
                }
              }
              //pageList를 통해 뽑아야할 번호들만 뽑는다.
              if (pageList - 5 <= index && index < pageList) {
                if (episode.id === episodeData.searchEpisode.id) {
                  return (
                    <ThisEpisode key={episode.id + index}>
                      <EpisodeThumbnial src={episode.thumbnail} />
                      <EpisodeTitle>{episode.title}</EpisodeTitle>
                    </ThisEpisode>
                  );
                } else {
                  return (
                    <Episode key={episode.id + index}>
                      <Link
                        to={`/episodeWatch/${episode.id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "inherit"
                        }}
                      >
                        <EpisodeThumbnial src={episode.thumbnail} />
                        <EpisodeTitle>{episode.title}</EpisodeTitle>
                      </Link>
                    </Episode>
                  );
                }
              }
            })}
          </EpisodeList>
          <NextButton
            onClick={() => {
              if (postDate.guestOneOfPost.episodes.length < pageList) {
                alert("Next");
              } else {
                setPageList(pageList + 5);
              }
              setCheckPageList("No");
            }}
          >
            <NextArrow />
          </NextButton>
        </EpisodeListBox>
      ) : (
        <Loader />
      )}
      <CommentBox>
        <Title>댓글</Title>
        <InputCommentBox>
          <InputComment {...comment} />
          <CommentPush
            onClick={() => {
              toast.warn("회원가입이 필요한 기능입니다🔒");
              comment.setValue("");
            }}
          >
            댓글입력
          </CommentPush>
        </InputCommentBox>
        <CommentViewBox id="fakeComment">
          {commentList.map((value, index) => {
            try {
              return (
                <Comment key={value.id + index}>
                  <TextBox>
                    <Writer>
                      {commentList[commentList.length - (index + 1)].user.email}
                    </Writer>
                    {changeLayout === "Basic" ? (
                      <CommentValue>
                        {commentList[commentList.length - (index + 1)].text}
                      </CommentValue>
                    ) : (
                      <>
                        {commentModifyId ===
                        commentList[commentList.length - (index + 1)].id ? (
                          ""
                        ) : (
                          <CommentValue>
                            {commentList[commentList.length - (index + 1)].text}
                          </CommentValue>
                        )}
                      </>
                    )}

                    <InputDate>
                      {commentList[
                        commentList.length - (index + 1)
                      ].createdAt.slice(0, 10)}
                    </InputDate>
                    <ButtonBox>
                      <LikeHome>
                        <LinkeButton
                          onClick={(e) => {
                            toast.warn("회원가입이 필요한 기능입니다🔒");
                          }}
                        >
                          <Like />
                        </LinkeButton>
                        {fakeCommentBucket[commentIdList.length - (index + 1)]
                          .value === 0
                          ? ""
                          : fakeCommentBucket[
                              commentIdList.length - (index + 1)
                            ].value}
                      </LikeHome>
                      <UnlikeButton
                        onClick={(e) => {
                          toast.warn("회원가입이 필요한 기능입니다🔒");
                        }}
                      >
                        <Unlike />
                      </UnlikeButton>
                    </ButtonBox>
                  </TextBox>
                  <Report>
                    <ReportButton>
                      <ReportIcon />
                    </ReportButton>
                  </Report>
                </Comment>
              );
            } catch (e) {
              window.location.reload();
            }
          })}
        </CommentViewBox>
      </CommentBox>
    </Container>
  );
};
