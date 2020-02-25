import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getRecipeList } from "../Libs/ApiCalls";

import RecipeList from "../Components/RecipeList";
import RecipeCard from "../Components/RecipeCard";
import RecipeFab from '../Components/RecipeFab';
import EmptyRecipe from "../Components/EmptyRecipe";

import Container from '@material-ui/core/Container';

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
  const [fabType, setFabType] = useState("new");
  const [isEditable, setIsEditable] = useState(false);

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

  const handleFabClick = (event) => {
    // if (fabType === "new") {
    //   setSelectedRecipe(EmptyRecipe)
    //   setFabType("save")
    //   setIsEditable(true)
    // }
    // if (fabType === "edit") {
    //   setFabType("save")
    //   setIsEditable(true)
    // }
    // if (fabType === "save") {
    //   setFabType("edit")
    //   setIsEditable(false)
    // }
  }

  return(
    <Container className={classes.root}>
      <RecipeFab handleClick={handleFabClick} type={fabType}/>
      {selectedRecipe
        ?<RecipeCard recipe={selectedRecipe} expanded editable={isEditable} />
        :<RecipeList recipeList={recipeList} appProps={props} />
      }
    </Container>
  )
}
