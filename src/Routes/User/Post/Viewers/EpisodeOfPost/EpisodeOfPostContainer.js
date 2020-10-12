import React, { useEffect, useState } from "react";
import EpisodeOfPostPresenter from "./EpisodeOfPostPresenter";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GUEST_ONE_OF_POST, SUBSCRIPTION_POST } from "./EpisodeOfPostQuery";
import Loader from "../../../../../Components/Loader";
import { toast } from "react-toastify";
import * as jwtDecode from "jwt-decode";

export default withRouter((props) => {
  //내가 현재 이 작품을 구독해놓았는지에 대한 hooks
  const [isSubscription, setIsSubscription] = useState(false);

  const postId = props.match.params.id;

  const { data, loading, error } = useQuery(GUEST_ONE_OF_POST, {
    variables: {
      id: postId
    }
  });

  const [subscriptionPostMutation] = useMutation(SUBSCRIPTION_POST, {
    variables: {
      postId
    }
  });

  const onSubmit = async (e) => {
    try {
      await subscriptionPostMutation();
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
  };

  return (
    <>
      {!loading && data && data.guestOneOfPost !== undefined ? (
        <EpisodeOfPostPresenter
          guestOneOfPost={data}
          loading={loading}
          isSubscription={isSubscription}
          setIsSubscription={setIsSubscription}
          onSubmit={onSubmit}
        />
      ) : (
        <Loader />
      )}
    </>
  );
});
