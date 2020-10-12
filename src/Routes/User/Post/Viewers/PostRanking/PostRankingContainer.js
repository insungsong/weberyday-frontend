import React from "react";
import PostRankingPresenter from "./PostRankingPresenter";
import { useQuery } from "react-apollo-hooks";
import { ALL_POST } from "../../../../Main/MainQuery";
import Loader from "../../../../../Components/Loader";

export default ({}) => {
  const { data, loading, error } = useQuery(ALL_POST);

  return loading ? <Loader /> : <PostRankingPresenter data={data} />;
};
