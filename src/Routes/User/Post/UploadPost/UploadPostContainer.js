import React from "react";
import UploadPresenter from "./UploadPostPresenter";
import useInput from "../../../../Hooks/useInput";

export default () => {
  const postTitle = useInput("");
  const postDescription = useInput("");

  return (
    <UploadPresenter postTitle={postTitle} postDescription={postDescription} />
  );
};
