import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Routes/Main";
import SignUp from "../Routes/SignUp";
import Me from "../Routes/User/Me";
import Certification from "../Routes/User/Certification";
import MyPostList from "../Routes/User/Post/Production/MyPostList";
import PostUpload from "../Routes/User/Post/Production/PostUpload";
import EpisodeOfPost from "../Routes/User/Post/Production/EpisodeOfPost";
import MyPostListUpadte from "../Routes/User/Post/Production/MyPostListUpdate";
import EpisodeUpload from "../Routes/User/Post/Production/EpisodeUpload";
import WatchEpisode from "../Routes/User/Post/Viewers/EpisodeWatch";
import GuestWatchEpisode from "../Routes/User/Post/Viewers/GuestEpisodeWatch";
import EpisodeUpdate from "../Routes/User/Post/Production/EpisodeUpdate";
import EpisodeListOfPost from "../Routes/User/Post/Viewers/EpisodeOfPost";
import EpisodeReport from "../Routes/User/Post/Viewers/EpisodeReportPage";
import MySubscriptionBucket from "../Routes/User/Post/Viewers/MySubscriptionBucket";
import PostRanking from "../Routes/User/Post/Viewers/PostRanking";
import CategoryOfPostList from "../Routes/User/Post/Viewers/CategoryOfPostList";
import FindPassword from "../Routes/User/FindPassword";
import NotificationBucket from "../Routes/User/Post/Viewers/NotificationPage";
import KakaoLoginFail from "../Routes/Auth/KakaoLoginFail";
import SignOutPage from "../Routes/Auth/SignOutPage";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/postRanking" component={PostRanking} />
      <Route path="/categoryOfPostList" component={CategoryOfPostList} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/me" component={Me} />
      <Route path="/findPassword" component={FindPassword} />
      <Route path="/certification" component={Certification} />
      <Route exact path="/myPostList" component={MyPostList} />
      <Route path="/myPostList/:id" component={EpisodeOfPost} />
      <Route path="/myPostUpdate/:id" component={MyPostListUpadte} />
      <Route path="/postUpload" component={PostUpload} />
      <Route path="/episodeUpload/:id" component={EpisodeUpload} />
      <Route path="/episodeUpdate/:id" component={EpisodeUpdate} />
      <Route exact path="/episodeList/:id" component={EpisodeListOfPost} />
      <Route path="/mySubscriptionBucket" component={MySubscriptionBucket} />
      <Route path="/myNotificationBucket" component={NotificationBucket} />
      <Route path="/kakaoLogin/fail" component={KakaoLoginFail} />
      <Route path="/signOutPage" component={SignOutPage} />

      {localStorage.getItem("token") ? (
        <Route path="/episodeWatch/:id" component={WatchEpisode} />
      ) : (
        <Route path="/episodeWatch/:id" component={GuestWatchEpisode} />
      )}
      <Route path="/episodeReport/:id" component={EpisodeReport} />
    </Switch>
  );
};
