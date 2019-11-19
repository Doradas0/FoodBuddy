import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "../Components/AppliedRoute";
import Header from "../Components/Header";
import Home from "../Containers/Home";
import NotFound from "../Containers/NotFound";
import SignIn from "../Containers/SignIn"

export default function Routes({ appProps }) {
  return (
    <React.Fragment>
      <Header appProps={appProps}/>
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/SignIn" exact component={SignIn} appProps={appProps} />

        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}
