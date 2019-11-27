import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from "../Components/RecipeCard";

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Recipes(props){
  const classes = useStyles();

  return(
    <Container maxWidth="sm">

      <Fab className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  )
}
