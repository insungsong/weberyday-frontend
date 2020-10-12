import React, { useState } from "react";
import WatchEpisodePresenter from "./EpisodeWatchPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GUEST_SEARCH_ONE_OF_EPISODE } from "./EpisodeWatchQuery";
import { withRouter } from "react-router-dom";
import Loader from "../../../../../Components/Loader";
import { GUEST_ONE_OF_POST } from "../EpisodeOfPost/EpisodeOfPostQuery";
import useInput from "../../../../../Hooks/useInput";
import { CURRENT_EPISODE_HITCOUNT_UPDATE } from "./EpisodeWatchQuery";
import * as jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export default withRouter((props) => {
  try {
    if (localStorage.getItem("token")) {
      jwtDecode(localStorage.getItem("token"));
    }
  } catch (e) {
    // localStorage.removeItem("userEmailToken");
    // localStorage.removeItem("token");
    toast.success(
      "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
    );
    setTimeout(() => {
      window.location.reload();
    }, [1500]);
  }

  const comment = useInput("");
  const episodeId = props.match.params.id;
  const [fakeLikeCountFilter, setFakeLikeCountFilter] = useState("Yes");
  const [fakeCommentBucket, setFakeCommentBucket] = useState([""]);
  const text = useInput("");

  const {
    data: episodeData,
    loading: episodeLoading,
    error: episodeError
  } = useQuery(GUEST_SEARCH_ONE_OF_EPISODE, {
    variables: { episodeId }
  });

  let postId = "";
  if (!episodeLoading) {
    if (
      (episodeData &&
        episodeData.searchEpisode &&
        episodeData.searchEpisode.post) !== undefined
    ) {
      postId = episodeData.searchEpisode.post.id;
    }
  }
  const {
    data: postDate,
    loading: postLoading,
    error: postError
  } = useQuery(GUEST_ONE_OF_POST, { variables: { id: postId } });

  //Episode List의 페이징을 위한 hooks
  const [pageList, setPageList] = useState(0);
  //Episode List의 페이징을 한번만 해당 Episode의 페이지로 보이게하는 hooks
  const [checkPageList, setCheckPageList] = useState("Yes");

  //현재 episodeId의 hitcount를 +1하게 하는 Mutation
  const [hitCountUpdateEpisodeMutation] = useMutation(
    CURRENT_EPISODE_HITCOUNT_UPDATE,
    {
      variables: {
        episodeId
      }
    }
  );

  let objectCommentIdList = [];

  //comment count를 위한 코드
  if (!episodeLoading) {
    if (
      (episodeData &&
        episodeData.searchEpisode &&
        episodeData.searchEpisode.comments) !== undefined
    ) {
      episodeData.searchEpisode.comments.map((value) => {
        objectCommentIdList.push({
          commentId: value.id,
          value: value.likes.length
        });
      });
    }
    if (fakeLikeCountFilter === "Yes") {
      setFakeCommentBucket(objectCommentIdList);
      setFakeLikeCountFilter("No");
    }
  }

  return (
    <>
      {episodeData !== undefined &&
      !episodeLoading &&
      postDate !== undefined ? (
        <WatchEpisodePresenter
          episodeLoading={episodeLoading}
          episodeData={episodeData}
          postDate={postDate}
          comment={comment}
          fakeCommentBucket={fakeCommentBucket}
          setFakeCommentBucket={setFakeCommentBucket}
          text={text}
          hitCountUpdateEpisodeMutation={hitCountUpdateEpisodeMutation}
          pageList={pageList}
          setPageList={setPageList}
          checkPageList={checkPageList}
          setCheckPageList={setCheckPageList}
        />
      ) : (
        <Loader />
      )}
    </>
  );
});
