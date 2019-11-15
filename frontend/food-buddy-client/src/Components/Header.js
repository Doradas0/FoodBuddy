import React from "react";
import {preventDefault} from "../Libs/Utils";
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Button from '@material-ui/core/Button';

export default props => {
  return (
    <AppBar position="absolute">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <RouterLink to="/">Food Buddy</RouterLink>
      {
        !props.authenticated
        ?<UnauthenticatedToolBar />
        :<AuthenticatedToolBar />
      }
    </Toolbar>
    </AppBar>
  );
}

const UnauthenticatedToolBar= props => {
  return(
    <Button onClick={preventDefault}>
      <RouterLink to="/Signin">SignIn</RouterLink>
    </Button>
  );
}

const AuthenticatedToolBar= props => {
  return(
    "Au"
  );
}
