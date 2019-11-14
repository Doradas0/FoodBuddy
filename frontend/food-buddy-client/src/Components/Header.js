import React from "react";
import { AppBar, Toolbar, IconButton} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import MenuIcon from "@material-ui/icons/Menu";
import Button from '@material-ui/core/Button';

export default props => {
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Link
        component="button"
        variant="body2"
        onClick={preventDefault}
        to="/"
        color="secondary"
      >
        Food Buddy
      </Link>
      {
        // !props.authenticated
        // ?<UnauthenticatedToolBar />
        // :<AuthenticatedToolBar />
      }
    </Toolbar>
    </AppBar>
  );
}

const preventDefault = event => event.preventDefault();

const UnauthenticatedToolBar= props => {
  return(
    <Button variant="contained">
      <Link  onClick={preventDefault} to="/Login">Login</Link>
    </Button>
  );
}

const AuthenticatedToolBar= props => {
  return(
    "Au"
  );
}
