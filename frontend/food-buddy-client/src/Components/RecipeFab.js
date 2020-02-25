import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1
  }
}));

export default ({handleClick, type}) => {
  const classes = useStyles();

  const typeMap = {
    new: {
      icon: <AddIcon />,
      color: "primary",
    },
    edit: {
      icon: <EditIcon />,
      color: "secondary"
    },
    save: {
      icon: <SaveOutlinedIcon />,
      color: "primary"
    },
  }



  return(
    <Fab
      onClick={handleClick}
      className={classes.fab}
      color={typeMap[type].color}
      aria-label="add"
    >
      {typeMap[type].icon}
    </Fab>
  );
}
