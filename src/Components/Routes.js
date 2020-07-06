import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../Routes/SignUp";
import Body from "./Body";
import Me from "../Routes/User/Me";
import Certification from "../Routes/User/Certification";
import MyPostList from "../Routes/User/Post/MyPostList";
import UploadPost from "../Routes/User/Post/UploadPost";

export default () => (
  <Switch>
    <Route exact path="/" component={Body} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/me" component={Me} />
    <Route path="/certification" component={Certification} />
    <Route path="/myPostList" component={MyPostList} />
    <Route path="/uploadPost" component={UploadPost} />
  </Switch>
);
