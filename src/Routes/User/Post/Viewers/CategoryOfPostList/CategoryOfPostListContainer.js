import React, { useState } from "react";
import CategoryOfPostListPresenter from "./CategoryOfPostListPresenter";
import { useQuery } from "react-apollo-hooks";
import { FIND_CATEGORY } from "./CategoryOfPostListQuery";
import Loader from "../../../../../Components/Loader";
import { ALL_POST } from "../../../../Main/MainQuery";
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
  const { data, loading, error } = useQuery(FIND_CATEGORY);
  let currentCategoryUrl = props.location.pathname.split("/");
  let currentCategoryId = currentCategoryUrl[2];
  const [value, setValue] = useState("No");
  const [change, setChange] = useState("allPost");

  const {
    data: allPostData,
    loading: allPostLoading,
    error: allPostError
  } = useQuery(ALL_POST);

  return !loading && !allPostLoading ? (
    <CategoryOfPostListPresenter
      data={data}
      allPostData={allPostData}
      currentCategoryId={currentCategoryId}
      value={value}
      setValue={setValue}
      change={change}
      setChange={setChange}
    />
  ) : (
    <Loader />
  );
});
