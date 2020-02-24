import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getRecipeList } from "../Libs/ApiCalls";

import RecipeList from "../Components/RecipeList";
import RecipeCard from "../Components/RecipeCard";
// import EmptyRecipe from "../Components/EmptyRecipe";

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1
  }
}));

export default function Recipes({ recipeList, setRecipeList, isAuthenticated, ...props } ){
  const classes = useStyles();

  const recipeId = props.match.params.id;
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  React.useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      if (!recipeList){
        try {
          setRecipeList(await getRecipeList());
        } catch (err) {
          alert(err);
        }
      }
      if (recipeId && recipeList) {
        setSelectedRecipe(recipeList.find(recipe => {
          return recipe.recipeId === recipeId;
        }));
      }
      if (!recipeId) {
        setSelectedRecipe(null);
      }
    }
    onLoad();
  }, [isAuthenticated, recipeList, setRecipeList, recipeId]);

  return(
    <Container className={classes.root}>
      <Fab className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      {selectedRecipe
        ?<RecipeCard recipe={selectedRecipe} expanded />
        :<RecipeList recipeList={recipeList} appProps={props} />
      }
    </Container>
  )
}
