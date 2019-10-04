import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Home from "../containers/Home";
import RecipeBook from "../containers/RecipeBook";
import MenuPlan from "../containers/MenuPlan";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/RecipeBook" exact component={RecipeBook} />
    <Route path="/MenuPlan" exact component={MenuPlan} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
