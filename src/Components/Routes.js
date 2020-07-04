import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../Routes/SignUp";
import Body from "./Body";
import Me from "../Routes/User/Me";

export default () => (
  <Switch>
    <Route exact path="/" component={Body} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/me" component={Me} />
  </Switch>
);
