import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Containers/Home";
import SignIn from "../Containers/SignIn"

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/SignIn" exact component={SignIn} />

    </Switch>
  );
}
