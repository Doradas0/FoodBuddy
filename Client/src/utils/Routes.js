import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "../components/Routes/AppliedRoute";

import NotFound from '../containers/NotFound';
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import RecipeBook from "../containers/RecipeBook";
import MenuPlan from "../containers/MenuPlan";
import Pantry from "../containers/Pantry";
import ShoppingList from "../containers/ShoppingList";

export default ({ appProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} appProps={appProps} />
    <AppliedRoute path="/Login" exact component={Login} appProps={appProps} />
    <AppliedRoute path="/Signup" exact component={Signup} appProps={appProps} />
    <AppliedRoute path="/RecipeBook" exact component={RecipeBook} appProps={appProps} />
    <AppliedRoute path="/MenuPlan" exact component={MenuPlan} appProps={appProps} />
    <AppliedRoute path="/Pantry" exact component={Pantry} appProps={appProps} />
    <AppliedRoute path="/ShoppingList" exact component={ShoppingList} appProps={appProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
