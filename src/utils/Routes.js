import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import RecipeBook from "../containers/RecipeBook";
import MenuPlan from "../containers/MenuPlan";
import Pantry from "../containers/Pantry";
import ShoppingList from "../containers/ShoppingList";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Login" exact component={Login} />
    <Route path="/Signup" exact component={Signup} />
    <Route path="/RecipeBook" exact component={RecipeBook} />
    <Route path="/MenuPlan" exact component={MenuPlan} />
    <Route path="/Pantry" exact component={Pantry} />
    <Route path="/ShoppingList" exact component={ShoppingList} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
