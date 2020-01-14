import React, {useState} from "react";
import { API } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from "../Components/RecipeCard";
import EmptyRecipe from "../Components/EmptyRecipe";

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
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [curruntRecipe, setCurrentRecipe] = useState(null);

  console.log(recipes);

  React.useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
      try {
        const recipes = await loadRecipes();
        setRecipes(recipes);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);


  function loadRecipes() {
    return API.get("Food_Buddy_Recipe", "/recipes");
  }

  function createRecipe() {
    setCurrentRecipe(EmptyRecipe);
  }

  return(
    <Container>
      <Fab onClick={createRecipe} className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      {curruntRecipe &&
        <RecipeCard recipe={curruntRecipe} large appProps={props}/>
      }
    </Container>
  )
}
