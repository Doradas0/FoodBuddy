import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Home from "../containers/Home";
import RecipeBook from "../containers/RecipeBook";
import MenuPlan from "../containers/MenuPlan";
import Pantry from "../containers/Pantry";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/RecipeBook" exact component={RecipeBook} />
    <Route path="/MenuPlan" exact component={MenuPlan} />
    <Route path="/Pantry" exact component={Pantry} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
