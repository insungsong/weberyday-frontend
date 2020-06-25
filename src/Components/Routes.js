import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import SignUp from "../Routes/SignUp";
import Body from "./Body";

export default () => (
  <Switch>
    <Route exact path="/" component={Body} />
    <Route path="/signUp" component={SignUp} />
  </Switch>
);
