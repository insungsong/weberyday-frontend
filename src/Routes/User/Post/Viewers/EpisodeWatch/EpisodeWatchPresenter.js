import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Like,
  Unlike,
  FillUnlike,
  Sharing,
  ReportIcon,
  Eraser,
  FixIcon,
  FillLike,
  ReversArrow,
  NextArrow
} from "../../../../../Components/Icons";
import EpisodeReportPage from "../EpisodeReportPage";
import Loader from "../../../../../Components/Loader";
import { toast } from "react-toastify";
import * as jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 80%;
`;

const VideoBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  z-index: 100;
`;

const Video = styled.video.attrs({
  pointerEvents: "none"
})`
  width: 100%;
  height: 500px;
  background: black;
  margin-top: 20px;
  z-index: 100;
  display: block;
`;

const EpisodeListBox = styled.div`
  border-top: 0.5px solid lightgrey;
  border-bottom: 0.5px solid lightgrey;
  margin: 20px 0;
  display: flex;
`;

const EpisodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 15px 0;
`;

const Episode = styled.div`
  padding: 15px;
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
  line-height: 100%;
`;

const EpisodeButtonBox = styled.div`
  display: flex;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
`;

const LikeCount = styled.p`
  line-height: 2em;
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
  margin: 15px;
  height: 30px;
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
  border-bottom: 1px solid lightgrey;

  :hover {
    button {
      display: inline;
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
`;

const Writer = styled.p`
  margin-bottom: 15px;
`;

const CommentValue = styled.p``;

const InputDate = styled.p`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Report = styled.div``;

const ReportButton = styled.button`
  display: none;
  border: none;
  background: none;
`;

const EpisodeReportButton = styled.button`
  background: none;
  border: none;
`;

const LinkeButton = styled.button`
  border: none;
  background: none;
`;

const UnlikeButton = styled.button`
  border: none;
  background: none;
`;

const EraserBox = styled.div`
  margin-left: 10px;
`;

const CommentOneLine = styled.div``;

const OpenReport = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const ReportBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default ({
  meData,
  episodeData,
  postDate,
  comment,
  text,
  fakeCommentBucket,
  toggleLike,
  episodeIsLike,
  setEpisodeIsLike,
  episodeId,
  filterFakeComment,
  toggleUnLike,
  setCommentChangeValue,
  setDeleteCommentValueBox,
  deleteCommentAllValueBox,
  setCurrentLikeId,
  fakeLikeList,
  fakeUnLikeList,
  setCurrentUnLikeId,
  fakeLikeCountArr,
  setFakeLikeCountArr,
  hitCountUpdateEpisodeMutation,
  onReport,
  setOnReport,
  postLoading,
  reportKind,
  setReportKind,
  offenderIdBucket,
  setOffenderIdBucket,
  pageList,
  setPageList,
  checkPageList,
  setCheckPageList,
  setFakeLikeCountFilter,
  onSubmit
}) => {
  try {
    if (localStorage.getItem("token")) {
      jwtDecode(localStorage.getItem("token"));
    }
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }

  const [changeLayout, setChangeLayout] = useState("Basic");
  const [commentModifyId, setCommentModifyId] = useState("");

  //commentId를 담기위한 hooks
  const [commentValueBox, setCommentValueBox] = useState("");

  //comment의 text값을 받기위해
  const [commentText, setCommentText] = useState("");

  let postDateBox = "";
  if (postDate !== undefined && postDate.oneOfPost !== undefined) {
    postDateBox = postDate;
  }

  //episodeData.searchEpisode.likes에 좋아요가 있다면 좋아요를 읽어버리는 경우가 있어서 true로 설정해주는 filtering코드
  // episodeData.searchEpisode.likes.map((value) => {
  //   setEpisodeIsLike(true);
  // });

  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  let realTime = year + "-" + month + "-" + day;
  let num = 0;
  let commentList = episodeData.searchEpisode.comments;

  //현재 이 에피소드의 댓글이 가진, 좋아요들
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

  //내가 현재 에피소드화에서 누른 댓글 좋아요의 유무
  let meDataLikeBox = [];
  meData.findUserInfo.likes.map((like, index) => {
    meDataLikeBox.push(like.id);
  });

  let episodeOfCommentUnLikeDataIdBox = [];
  episodeData.searchEpisode.comments.map((value, index) => {
    if (value.unlikes.length !== 0) {
      value.unlikes.map((commentIdList) => {
        episodeOfCommentUnLikeDataIdBox.push(commentIdList.id);
      });
    }
  });

  let meDataUnLikeBox = [];
  meData.findUserInfo.unlikes.map((unlikes, index) => {
    meDataUnLikeBox.push(unlikes.id);
  });

  //조회수 +1올리기 위한 코드
  if (document.getElementById("currentVideo") !== null) {
    document.getElementById("currentVideo").addEventListener("ended", () => {
      hitCountUpdateEpisodeMutation();
    });
  }

  let video = "";
  if (document.getElementById("currentVideo") !== null) {
    video = document.getElementById("currentVideo");
  }

  let offenderId = "";

  if (!postLoading) {
    offenderId = postDate.guestOneOfPost.teamName.id;
  }
  const [clickIsTrue, setClickIsTrue] = useState(false);

  return (
    <Container>
      {onReport === "on" ? (
        <OpenReport>
          <ReportBox>
            <EpisodeReportPage
              episodeId={episodeId}
              onReport={onReport}
              setOnReport={setOnReport}
              offenderIdBucket={offenderIdBucket}
              reportKind={reportKind}
              commentText={commentText}
            />
          </ReportBox>
        </OpenReport>
      ) : (
        ""
      )}
      <VideoBox>
        <Video
          id="currentVideo"
          controls
          controlsList="nodownload"
          src={episodeData.searchEpisode.file}
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
                setEpisodeIsLike(!episodeIsLike);
                toggleLike("episodeLike");
                setClickIsTrue(!clickIsTrue);
              }}
            >
              {episodeIsLike ? <FillLike /> : <Like />}
            </LikeButton>
            <SharingButton>
              <Sharing />
            </SharingButton>
            <EpisodeReportButton
              onClick={() => {
                setReportKind("EPISODE_REPORT");
                setOnReport("on");
              }}
            >
              <ReportIcon />
            </EpisodeReportButton>
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
                    <Episode
                      key={episode.id + index}
                      onClick={() => {
                        setFakeLikeCountFilter("Yes");
                        window.location.href = `/episodeWatch/${episode.id}`;
                      }}
                    >
                      <EpisodeThumbnial src={episode.thumbnail} />
                      <EpisodeTitle>{episode.title}</EpisodeTitle>
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
          <InputComment style={{ marginTop: "15px" }} {...comment} />
          <CommentPush
            onClick={(e) => {
              onSubmit("addComment", episodeId);
              toast.success("댓글을 업로드 중입니다... 👨🏻‍💻");
            }}
          >
            댓글입력
          </CommentPush>
        </InputCommentBox>
        <CommentViewBox id="fakeComment">
          {fakeCommentBucket && fakeCommentBucket[0].length !== 0
            ? fakeCommentBucket.map((fake, index) => {
                if (
                  filterFakeComment[fakeCommentBucket.length - (index + 1)] ===
                  episodeId
                ) {
                  try {
                    return (
                      <Comment>
                        <TextBox>
                          <Writer>
                            {localStorage
                              .getItem("userEmailToken")
                              .substring(0, 4)}
                            *****
                          </Writer>
                          <CommentValue>
                            {
                              fakeCommentBucket[
                                fakeCommentBucket.length - (index + 1)
                              ]
                            }
                          </CommentValue>
                          <InputDate>{realTime}</InputDate>
                        </TextBox>
                      </Comment>
                    );
                  } catch (e) {
                    localStorage.removeItem("userEmailToken");
                    localStorage.removeItem("token");

                    setTimeout(() => {
                      window.location.href = "/";
                    }, [1500]);
                  }
                }
              })
            : ""}

          {commentList.map((value, index) => {
            if (
              deleteCommentAllValueBox.includes(
                commentList[commentList.length - (index + 1)].id
              )
            ) {
              return <></>;
            } else {
              return (
                <CommentOneLine key={value.id + index}>
                  <Comment key={value.id + index}>
                    <TextBox>
                      <Writer>
                        {commentList[
                          commentList.length - (index + 1)
                        ].user.email.substring(0, 4)}
                        *****
                      </Writer>
                      {changeLayout === "Basic" ? (
                        commentValueBox ===
                        commentList[commentList.length - (index + 1)].id ? (
                          <CommentValue>
                            {
                              (commentList[
                                commentList.length - (index + 1)
                              ].text = text.value)
                            }
                          </CommentValue>
                        ) : (
                          <CommentValue>
                            {commentList[commentList.length - (index + 1)].text}
                          </CommentValue>
                        )
                      ) : (
                        <>
                          {commentModifyId ===
                          commentList[commentList.length - (index + 1)].id ? (
                            <>
                              <InputComment {...text} />
                              <ButtonBox>
                                <CommentPush
                                  onClick={(e) => {
                                    toast.info("해당 댓글이 수정되었습니다.");
                                    setChangeLayout("Basic");
                                    setCommentChangeValue(false);
                                    setCommentValueBox(
                                      commentList[
                                        commentList.length - (index + 1)
                                      ].id
                                    );
                                    onSubmit(
                                      "modifyComment",
                                      commentList[
                                        commentList.length - (index + 1)
                                      ].id
                                    );
                                  }}
                                >
                                  변경
                                </CommentPush>
                                <CommentPush
                                  style={{ backgroundColor: "red" }}
                                  onClick={(e) => {
                                    setChangeLayout("Basic");
                                  }}
                                >
                                  취소
                                </CommentPush>
                              </ButtonBox>
                            </>
                          ) : (
                            <CommentValue>
                              {
                                commentList[commentList.length - (index + 1)]
                                  .text
                              }
                              <EraserBox
                                onClick={async (e) => {
                                  await onSubmit(
                                    "deleteComment",
                                    commentList[
                                      commentList.length - (index + 1)
                                    ].id
                                  );
                                }}
                              >
                                <Eraser />
                              </EraserBox>
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
                        <LinkeButton
                          onClick={() => {
                            const commentId =
                              commentList[commentList.length - (index + 1)].id;
                            if (
                              fakeLikeCountArr[commentList.length - (index + 1)]
                                .commentId === commentId
                            ) {
                              if (
                                !document.getElementById(`fillLike${index}`)
                              ) {
                                fakeLikeCountArr[
                                  commentList.length - (index + 1)
                                ].value += 1;
                                setFakeLikeCountArr(fakeLikeCountArr);
                              } else {
                                fakeLikeCountArr[
                                  commentList.length - (index + 1)
                                ].value -= 1;
                                setFakeLikeCountArr(fakeLikeCountArr);
                              }
                            }
                            setCurrentLikeId(commentId);
                            toggleLike("commentLike", commentId);
                          }}
                        >
                          {fakeLikeList.length !== 0 ? (
                            fakeLikeList.map((dbLike, cindex) => {
                              if (
                                commentIdList[
                                  commentIdList.length - (index + 1)
                                ] === dbLike &&
                                fakeLikeList.includes(
                                  commentIdList[
                                    commentIdList.length - (index + 1)
                                  ]
                                )
                              ) {
                                return (
                                  <FillLike
                                    id={`fillLike${index}`}
                                    key={dbLike.id + index}
                                  />
                                );
                              } else if (
                                fakeLikeList.length - 1 === cindex &&
                                !fakeLikeList.includes(
                                  commentIdList[
                                    commentIdList.length - (index + 1)
                                  ]
                                )
                              ) {
                                return <Like key={dbLike.id + index} />;
                              }
                            })
                          ) : (
                            <Like key={index} />
                          )}
                        </LinkeButton>
                        <LikeCount>
                          {fakeLikeCountArr[commentIdList.length - (index + 1)]
                            .value === 0
                            ? ""
                            : fakeLikeCountArr[
                                commentIdList.length - (index + 1)
                              ].value}
                        </LikeCount>
                        <UnlikeButton
                          onClick={() => {
                            const commentId =
                              commentList[commentList.length - (index + 1)].id;
                            setCurrentUnLikeId(commentId);
                            toggleUnLike(commentId);
                          }}
                        >
                          {fakeUnLikeList.length !== 0 ? (
                            fakeUnLikeList.map((dbLike, cindex) => {
                              if (
                                commentIdList[
                                  commentIdList.length - (index + 1)
                                ] === dbLike &&
                                fakeUnLikeList.includes(
                                  commentIdList[
                                    commentIdList.length - (index + 1)
                                  ]
                                )
                              ) {
                                return <FillUnlike key={dbLike.id + index} />;
                              } else if (
                                fakeUnLikeList.length - 1 === cindex &&
                                !fakeUnLikeList.includes(
                                  commentIdList[
                                    commentIdList.length - (index + 1)
                                  ]
                                )
                              ) {
                                return <Unlike key={dbLike.id + index} />;
                              }
                            })
                          ) : (
                            <Unlike />
                          )}
                        </UnlikeButton>
                        {commentList[commentList.length - (index + 1)].user
                          .email === localStorage.getItem("userEmailToken") ? (
                          <>
                            <EraserBox
                              onClick={async (e) => {
                                toast.info("해당 댓글이 삭제되었습니다.");
                                setDeleteCommentValueBox(
                                  commentList[commentList.length - (index + 1)]
                                    .id
                                );

                                await onSubmit(
                                  "deleteComment",
                                  commentList[commentList.length - (index + 1)]
                                    .id
                                );
                              }}
                            >
                              <Eraser />
                            </EraserBox>
                            <EraserBox
                              onClick={(e) => {
                                setChangeLayout("Modify");
                                text.setValue(
                                  commentList[commentList.length - (index + 1)]
                                    .text
                                );
                                setCommentModifyId(
                                  commentList[commentList.length - (index + 1)]
                                    .id
                                );
                              }}
                            >
                              <FixIcon />
                            </EraserBox>
                          </>
                        ) : (
                          ""
                        )}
                      </ButtonBox>
                    </TextBox>
                    <Report>
                      <ReportButton
                        onClick={async () => {
                          await setReportKind("COMMENT_REPORT");
                          await setOffenderIdBucket(
                            commentList[commentList.length - (index + 1)].id
                          );
                          await setCommentText(
                            commentList[commentList.length - (index + 1)].text
                          );
                          await setOnReport("on");
                        }}
                      >
                        <ReportIcon />
                      </ReportButton>
                    </Report>
                  </Comment>
                </CommentOneLine>
              );
            }
          })}
        </CommentViewBox>
      </CommentBox>
    </Container>
  );
};
