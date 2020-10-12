import React, { useState } from "react";
import UploadPresenter from "./PostUploadPresenter";
import useInput from "../../../../../Hooks/useInput";
import { useQuery } from "react-apollo-hooks";
import { FIND_CATEGORY } from "./PostUploadQuery";
import useRadioInput from "../../../../../Hooks/useRadioInput";
import useRadioBroadcast from "../../../../../Hooks/useRadioBroadcast";
import useInputDuplicateCheck from "../../../../../Hooks/useInputDuplicateCheck";
import { SEARCH_EPISODE } from "../EpisodeUpdate/EpisodeUpdateQuery";

export default () => {
  const postTitle = useInput("");
  const postDescription = useInput("");
  const postGenre = useRadioInput("");
  const postBroadcast = useRadioBroadcast(false);
  const postUploadDay = useInputDuplicateCheck("");
  const [filter, setFilter] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const [backgroundImgBase64, setBackgroundImgBase64] = useState("");

  const { data, loading, error } = useQuery(FIND_CATEGORY);

  const onSubmit = () => {
    document.cookie = `postTitle=${postTitle.value}`;
    document.cookie = `postDescription=${postDescription.value}`;
    document.cookie = `postGenre=${postGenre.get}`;
    document.cookie = `postBroadcast=${postBroadcast.get}`;
    document.cookie = `postUpload=${postUploadDay.arr}`;
    document.cookie = `filterCookie=${true}`;
    //localhost:5000에 다녀온후 MyPostListContainer.js로 이동
  };

  return (
    <UploadPresenter
      imgBase64={imgBase64}
      setImgBase64={setImgBase64}
      postTitle={postTitle}
      postDescription={postDescription}
      postGenre={postGenre}
      data={data}
      postBroadcast={postBroadcast}
      postUploadDay={postUploadDay}
      setFilter={setFilter}
      backgroundImgBase64={backgroundImgBase64}
      setBackgroundImgBase64={setBackgroundImgBase64}
      onSubmit={onSubmit}
    />
  );
};
