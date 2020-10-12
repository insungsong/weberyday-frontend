import React, { useState, useEffect } from "react";
import MySubscriptionBucketPresenter from "./MySubscriptionBucketPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { MY_SUBSCRIPTION_POST_LIST } from "./MySubscriptionBucketQuery";
import Loader from "../../../../../Components/Loader";
import { SUBSCRIPTION_POST } from "../EpisodeOfPost/EpisodeOfPostQuery";
import * as jwtDecode from "jwt-decode";

export default ({}) => {
  const { data, loading, error, refetch } = useQuery(MY_SUBSCRIPTION_POST_LIST);

  //구독을 취소하게 하는 Mutation
  const [cancleSubscriptionMutation] = useMutation(SUBSCRIPTION_POST);

  //render를 하게 해주는 hooks
  const onSubmit = async (postId) => {
    try {
      await cancleSubscriptionMutation({
        variables: {
          postId
        }
      });
    } catch (e) {
      localStorage.removeItem("userEmailToken");
      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/";
      }, [1500]);
    }
  };
  const [render, setRender] = useState(false);

  useEffect(() => {
    refetch();
  }, [render]);

  return (
    <>
      {!loading ? (
        <MySubscriptionBucketPresenter
          data={data}
          error={error}
          refetch={refetch}
          onSubmit={onSubmit}
          render={render}
          setRender={setRender}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
