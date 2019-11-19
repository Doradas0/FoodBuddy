import React from "react";
import clsx from 'clsx';
import {preventDefault} from "../Libs/Utils";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const drawerHeight = 208;

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
  },
  navigationBtn: {
    position: "fixed",
    left: "50%",
    padding: 0
  },
  navigationBar: {
    position: "fixed",
  },
  profileBtn: {
    marginLeft: "auto"
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginTop: drawerHeight,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  RouterLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default props => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
    top: false,
    menu: false
  });

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (side) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: !state.top });
  };

  const handleClick = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Recipes', 'Menu', 'Pantry', 'Shopping'].map((text, index) => (
          <RouterLink to={`/${text}`} key={text} className={classes.RouterLink}>
            <ListItem button >
                <ListItemText primary={text} />
            </ListItem>
          </RouterLink>
        ))}
      </List>
    </div>
  );

  return (
    <div className="Header">
      <Drawer variant="persistent" anchor="top" open={state.top} onClose={toggleDrawer('top')}>
      {fullList('top')}
      </Drawer>
      <AppBar position="static" className={clsx(classes.appBar, state.top && classes.appBarShift)}>
        <Toolbar className={classes.root}>
          <Typography variant="h6">Food Buddy</Typography>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.navigationBtn} onClick={toggleDrawer('top')}>
              <ExpandLessIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Tabs value={value} onChange={handleChange} className={classes.navigationBar} aria-label="simple tabs example">
              <Tab label="Recipes"/>
              <Tab label="Menu"/>
              <Tab label="Pantry"/>
              <Tab label="Shopping"/>
            </Tabs>
          </Hidden>
          <IconButton onClick={handleClick} className={classes.profileBtn} edge="start" color="inherit" aria-label="menu">
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}


// <Hidden xsDown>
//   {
//     !props.authenticated
//     ?<UnauthenticatedToolBar />
//     :<AuthenticatedToolBar />
//   }
// </Hidden>

const UnauthenticatedProfile = ({closeMenu, ...props}) => {
  return(
    "Un"
  );
}

const AuthenticatedToolBar= props => {
  return(
    "Au"
  );
}
