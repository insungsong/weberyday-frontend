import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../Routes/SignUp";
import Body from "./Body";

export default () => (
  <Switch>
    <Route exact path="/" component={Body} />
    <Route path="/signUp" component={SignUp} />
  </Switch>
);
