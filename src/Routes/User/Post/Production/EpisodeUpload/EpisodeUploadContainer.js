import React, { useState } from "react";
import UploadEpisodePresenter from "./EpisodeUploadPresenter";
import useInput from "../../../../../Hooks/useInput";
import { withRouter } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

export default withRouter((props) => {
  const postId = props.match.params.id;
  const episodeTitle = useInput("");
  const episodeDescription = useInput("");
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [videoBase64, setVideoBase64] = useState(""); // 파일 base64

  const onSubmit = () => {
    document.cookie = `postId=${postId}`;
    document.cookie = `EpisodeTitle=${episodeTitle.value}`;
    document.cookie = `EpisodeDescription=${episodeDescription.value}`;
    document.cookie = `filterCookie=${true}`;
    //이제 localhost:5000으로 갔다가 그 localhost:5000에서 말하는 redirect url Container로 간다 여기서 말하는 container는 EpisodeOfPostContainer이다.
  };

  return (
    <UploadEpisodePresenter
      postId={postId}
      episodeTitle={episodeTitle}
      episodeDescription={episodeDescription}
      imgBase64={imgBase64}
      setImgBase64={setImgBase64}
      videoBase64={videoBase64}
      setVideoBase64={setVideoBase64}
      onSubmit={onSubmit}
    />
  );
});
