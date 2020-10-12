import React, { useState, useEffect } from "react";
import WatchEpisodePresenter from "./EpisodeWatchPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  SEARCH_ONE_OF_EPISODE,
  UPLOAD_COMMENT,
  EDIT_COMMENT,
  TOGGLE_LIKE,
  TOGGLE_UNLIKE,
  MY_LIKES_OF_ONE_EPISODE,
  MY_UNLIKES_OF_ONE_EPISODE,
  CURRENT_EPISODE_HITCOUNT_UPDATE
} from "./EpisodeWatchQuery";
import { withRouter } from "react-router-dom";
import Loader from "../../../../../Components/Loader";
import useInput from "../../../../../Hooks/useInput";
import { FIND_USER_INFO } from "../../../Me/MeQuery";
import { GUEST_ONE_OF_POST } from "../EpisodeOfPost/EpisodeOfPostQuery";
import { toast } from "react-toastify";
import * as jwtDecode from "jwt-decode";

export default withRouter((props) => {
  const comment = useInput("");
  const episodeId = props.match.params.id;
  const [fakeComment, setFakeComment] = useState("");
  const [fakeCommentBucket, setFakeCommentBucket] = useState([""]);
  const [episodeIsLike, setEpisodeIsLike] = useState(false);
  //내가 쓴 댓글 수정이 되었는지를 기준으로 하는 hooks
  const [changeCommentValue, setCommentChangeValue] = useState(true);
  //Report 화면이 보여지게하는 상태값hooks
  const [onReport, setOnReport] = useState("off");
  //LikeFake를 만들어주기위한 hooks
  const [likeIsLike, setLikeIsLike] = useState(false);

  //Episode List의 페이징을 위한 hooks
  const [pageList, setPageList] = useState(0);
  //Episode List의 페이징을 한번만 해당 Episode의 페이지로 보이게하는 hooks
  const [checkPageList, setCheckPageList] = useState("Yes");

  //댓글 삭제 fake를 위한 hooks
  const [fakeDeleteComment, setFakeDeleteComment] = useState("");

  //render가 될때, 페이크댓글을 해당 id에피소드에 달아도 다른 episode id에도 보인다 이 상황을 방지하기 위한 hooks
  const [filterFakeComment, setFilterFakeComment] = useState([""]);

  //내가 좋아요를 누른 댓글들의 Id
  const [commentLikeData, setCommentLikeData] = useState(["fake"]);
  const [episodeLikedCheck, setEpisodeLikedCheck] = useState(true);

  const [isEpisodOfMeLike, setIsEpisodOfMeLike] = useState("");

  const text = useInput("");

  let saveArr = [];
  let saveEpisodeIdArr = [];
  let saveCommentIsLike = [""];

  //특정 comment를 삭제할때 id를 담기위한 hooks
  const [deleteCommentAllValueBox, setDeleteCommentAllValueBox] = useState([
    ""
  ]);
  //삭제버튼을 누른 commentid가 들어감
  const [deleteCommentValueBox, setDeleteCommentValueBox] = useState("");

  try {
    if (localStorage.getItem("token")) {
      jwtDecode(localStorage.getItem("token"));
    }
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");
    toast.success(
      "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
    );
    setTimeout(() => {
      window.location.reload();
    }, [1500]);
  }

  let fakeCommentValueArr = [];
  useEffect(() => {
    deleteCommentAllValueBox.map((value) => {
      if (value !== "") {
        fakeCommentValueArr.push(value);
      }
    });
    if (deleteCommentValueBox !== "") {
      fakeCommentValueArr.push(deleteCommentValueBox);
    }

    setDeleteCommentAllValueBox(fakeCommentValueArr);
  }, [deleteCommentValueBox]);

  fakeCommentBucket.map((fake) => {
    if (fake !== "") {
      saveArr.push(fake);
    }
  });

  filterFakeComment.map((fake) => {
    if (fake !== "") {
      saveEpisodeIdArr.push(fake);
    }
  });
  saveArr.push(comment.value);
  saveEpisodeIdArr.push(episodeId);

  const { data: meData, loading, error } = useQuery(FIND_USER_INFO);

  const {
    data: episodeData,
    loading: episodeLoading,
    error: episodeError,
    refetch: episodeRefetch
  } = useQuery(SEARCH_ONE_OF_EPISODE, {
    variables: { episodeId }
  });

  let fakeEpisodeIsLikeArr = [];
  const [episodeIsLikeArr, setEpisodeIsLikeArr] = useState([]);

  if (
    !episodeLoading &&
    !loading &&
    episodeLikedCheck === true &&
    episodeData &&
    episodeData.searchEpisode &&
    episodeData.searchEpisode.likes !== undefined
  ) {
    episodeData.searchEpisode.likes.map((isLike, index) => {
      fakeEpisodeIsLikeArr.push(isLike.id);

      if (meData.findUserInfo.id === isLike.user.id) {
        setEpisodeIsLike(true);
      }
    });
    setEpisodeIsLikeArr(fakeEpisodeIsLikeArr);

    //무한 렌더를 막기위한
    setEpisodeLikedCheck(false);
  }

  //해당 에피소드의 댓글들에 대한 좋아요의 유무를 가져오는 코드
  if (episodeData !== undefined) {
    try {
      episodeData.searchEpisode.comments.map((value, index) => {
        value.likes.map((isLike, index) => {
          if (saveCommentIsLike[0] === "") {
            saveCommentIsLike[0] = isLike.id;
          } else {
            saveCommentIsLike.push(isLike.id);
          }
        });
      });
    } catch (e) {
      toast.warning(
        "해당 페이지의 오류로 인하여 메인화면으로 이동합니다 불편을 드려 죄송합니다. 🧑‍💻"
      );
    }

    if (commentLikeData[0] === "fake") {
      setCommentLikeData(saveCommentIsLike);
    }
  }

  //현재 episodeId의 hitcount를 +1하게 하는 Mutation
  const [hitCountUpdateEpisodeMutation] = useMutation(
    CURRENT_EPISODE_HITCOUNT_UPDATE,
    {
      variables: {
        episodeId
      }
    }
  );

  let postId = "";
  let objectCommentIdList = [];

  //comment Counter에 fake정보카운터를 담기위한 hooks
  const [fakeLikeCountArr, setFakeLikeCountArr] = useState([""]);
  const [fakeLikeCountFilter, setFakeLikeCountFilter] = useState("Yes");

  if (!episodeLoading) {
    if (
      (episodeData &&
        episodeData.searchEpisode &&
        episodeData.searchEpisode.post) !== undefined
    ) {
      postId = episodeData.searchEpisode.post.id;

      //comment count를 위한 코드
      episodeData.searchEpisode.comments.map((value) => {
        objectCommentIdList.push({
          commentId: value.id,
          value: value.likes.length
        });
      });
      //좋아요를 눌렀을떄나 뻇을떄, 카운트에대한 fake 코드
      if (fakeLikeCountFilter === "Yes") {
        setFakeLikeCountArr(objectCommentIdList);
        setFakeLikeCountFilter("No");
      }
    }
  }

  const {
    data: postDate,
    loading: postLoading,
    error: postError
  } = useQuery(GUEST_ONE_OF_POST, { variables: { id: postId } });

  const [uploadCommentMutation] = useMutation(UPLOAD_COMMENT, {
    variables: {
      text: comment.value,
      episodeId
    }
  });

  //하나의 에피소드에 내가 좋아요를 누른 댓글들만 뽑는 query
  const {
    data: myLikesOfOneEpisodeData,
    loading: myLikesOfOneEpisodeLoading,
    error: myLikesOfOneEpisodeError
  } = useQuery(MY_LIKES_OF_ONE_EPISODE, {
    variables: {
      episodeId
    }
  });

  const {
    data: myUnLikesOfOneEpisodeData,
    loading: myUnLikesOfOneEpisodeLoading,
    error: myUnLikesOfOneEpisodeError
  } = useQuery(MY_UNLIKES_OF_ONE_EPISODE, {
    variables: {
      episodeId
    }
  });

  //DB에서 가져온 좋아요들과 지금 누른 좋아요들을 담아놓는 hooks
  const [fakeLikeList, setFakeLikeList] = useState([""]);
  const [fakeUnLikeList, setFakeUnLikeList] = useState([""]);

  //DB에서 처음만 좋아요들을 가져오기 위한 filter hooks
  const [filter, setFilter] = useState("Yes");

  //지금 누른 좋아요 ID를 가져오는 hooks
  const [currentLikeId, setCurrentLikeId] = useState("");

  //지금 누른 싫어요 Id를 가져오는 hooks
  const [currentUnLikeId, setCurrentUnLikeId] = useState("");

  let fakeLikes = [];
  let fakeUnLikes = [];

  if (
    !myLikesOfOneEpisodeLoading &&
    !myUnLikesOfOneEpisodeLoading &&
    myLikesOfOneEpisodeData &&
    myLikesOfOneEpisodeData.myLikesOfOneEpisode !== undefined &&
    filter === "Yes"
  ) {
    myLikesOfOneEpisodeData.myLikesOfOneEpisode.map((dbLike) => {
      fakeLikes.push(dbLike.id);
      setFakeLikeList(fakeLikes);
      setFilter("No");
    });
    myUnLikesOfOneEpisodeData.myUnLikesOfOneEpisode.map((dbUnLike) => {
      fakeUnLikes.push(dbUnLike.id);
      setFakeUnLikeList(fakeUnLikes);
      setFilter("No");
    });
  }

  useEffect(() => {
    //좋아요의 눌림에 대한 fake
    fakeLikeList.map((value) => {
      fakeLikes.push(value);
    });
    if (currentLikeId !== "" && !fakeLikeList.includes(currentLikeId)) {
      fakeLikes.push(currentLikeId);
    } else if (fakeLikeList.includes(currentLikeId)) {
      fakeLikes.splice(fakeLikeList.indexOf(currentLikeId), 1);
    }
    setFakeLikeList(fakeLikes);
    setCurrentLikeId("");
  }, [currentLikeId]);

  useEffect(() => {
    fakeUnLikeList.map((value) => {
      fakeUnLikes.push(value);
    });
    if (currentUnLikeId !== "" && !fakeUnLikeList.includes(currentUnLikeId)) {
      fakeUnLikes.push(currentUnLikeId);
    } else if (fakeUnLikeList.includes(currentUnLikeId)) {
      fakeUnLikes.splice(fakeUnLikeList.indexOf(currentUnLikeId), 1);
    }
    setFakeUnLikeList(fakeUnLikes);
    setCurrentUnLikeId("");
  }, [currentUnLikeId]);

  const [editCommentMutation] = useMutation(EDIT_COMMENT);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const [toggleUnLikeMutation] = useMutation(TOGGLE_UNLIKE);

  const onSubmit = async (e, commentId) => {
    if (e === "addComment") {
      try {
        await uploadCommentMutation();
      } catch (e) {
        localStorage.removeItem("userEmailToken");
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.href = "/";
        }, [1500]);
      }
      setFakeComment(comment.value);
      setFakeCommentBucket(saveArr);
      setFilterFakeComment(saveEpisodeIdArr);
      comment.setValue("");
    }
    if (e === "deleteComment") {
      try {
        await editCommentMutation({
          variables: {
            episodeId,
            commentId,
            actions: "DELETE"
          }
        });
      } catch (e) {
        toast.error(
          "해당 기능적 오류로 인하여 메인화면으로 이동합니다. 관리자에게 문의 부탁드립니다.👨🏻‍💻"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    }
    if (e === "modifyComment") {
      try {
        await editCommentMutation({
          variables: {
            episodeId,
            commentId,
            text: text.value,
            actions: "EDIT"
          }
        });
      } catch (e) {
        toast.error(
          "해당 기능적 오류로 인하여 메인화면으로 이동합니다. 관리자에게 문의 부탁드립니다.👨🏻‍💻"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    }
  };

  const toggleLike = async (e, commentId) => {
    if (e === "episodeLike") {
      try {
        await toggleLikeMutation({
          variables: {
            episodeId
          }
        });
      } catch (e) {
        if (localStorage.getItem("token")) {
          try {
            jwtDecode(localStorage.getItem("token"));
          } catch (e) {
            localStorage.removeItem("userEmailToken");
            localStorage.removeItem("token");
            toast.success(
              "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
            );
            setTimeout(() => {
              window.location.href = `/episodeWatch/${episodeId}`;
            }, [1500]);
          }
        }
      }
    }
    if (e === "commentLike") {
      try {
        await toggleLikeMutation({
          variables: {
            commentId
          }
        });
      } catch (e) {
        if (localStorage.getItem("token")) {
          try {
            jwtDecode(localStorage.getItem("token"));
          } catch (e) {
            localStorage.removeItem("userEmailToken");
            localStorage.removeItem("token");
            toast.success(
              "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
            );
            setTimeout(() => {
              window.location.href = "/";
            }, [1500]);
          }
        }
      }
    }
  };

  const toggleUnLike = (commentId) => {
    toggleUnLikeMutation({
      variables: {
        commentId
      }
    });
  };
  //신고의 종류를 나누는 hooks  (ex)홈페이지신고  SITE_REPORT
  //                                댓글신고 COMMENT_REPORT
  //                                에피소드 신고 EPISODE_REPORT
  //                                확인 CHECKING
  //각각의 분류로 ReportCategory를 뽑아온다.
  const [reportKind, setReportKind] = useState("");
  //댓글 신고시 신고당한 댓글의 아이디를 넣어놓는 hooks
  const [offenderIdBucket, setOffenderIdBucket] = useState("");

  return (
    <>
      {episodeData !== undefined &&
      fakeLikeCountArr &&
      !episodeLoading &&
      meData &&
      meData.findUserInfo &&
      meData.findUserInfo.likes !== undefined ? (
        <WatchEpisodePresenter
          postDate={postDate}
          meData={meData}
          episodeLoading={episodeLoading}
          episodeData={episodeData}
          comment={comment}
          fakeComment={fakeComment}
          setFakeComment={setFakeComment}
          fakeCommentBucket={fakeCommentBucket}
          text={text}
          episodeIsLike={episodeIsLike}
          setEpisodeIsLike={setEpisodeIsLike}
          toggleLike={toggleLike}
          episodeId={episodeId}
          filterFakeComment={filterFakeComment}
          setFilterFakeComment={setFilterFakeComment}
          commentLikeData={commentLikeData}
          toggleUnLike={toggleUnLike}
          changeCommentValue={changeCommentValue}
          setCommentChangeValue={setCommentChangeValue}
          likeIsLike={likeIsLike}
          setLikeIsLike={setLikeIsLike}
          fakeDeleteComment={fakeDeleteComment}
          setFakeDeleteComment={setFakeDeleteComment}
          setDeleteCommentValueBox={setDeleteCommentValueBox}
          deleteCommentAllValueBox={deleteCommentAllValueBox}
          setCurrentLikeId={setCurrentLikeId}
          fakeLikeList={fakeLikeList}
          fakeUnLikeList={fakeUnLikeList}
          currentUnLikeId={currentUnLikeId}
          setCurrentUnLikeId={setCurrentUnLikeId}
          objectCommentIdList={objectCommentIdList}
          fakeLikeCountArr={fakeLikeCountArr}
          setFakeLikeCountArr={setFakeLikeCountArr}
          hitCountUpdateEpisodeMutation={hitCountUpdateEpisodeMutation}
          onReport={onReport}
          setOnReport={setOnReport}
          postLoading={postLoading}
          reportKind={reportKind}
          setReportKind={setReportKind}
          offenderIdBucket={offenderIdBucket}
          setOffenderIdBucket={setOffenderIdBucket}
          pageList={pageList}
          setPageList={setPageList}
          checkPageList={checkPageList}
          setCheckPageList={setCheckPageList}
          setFakeLikeCountFilter={setFakeLikeCountFilter}
          isEpisodOfMeLike={isEpisodOfMeLike}
          episodeRefetch={episodeRefetch}
          onSubmit={onSubmit}
        />
      ) : (
        <Loader />
      )}
    </>
  );
});
