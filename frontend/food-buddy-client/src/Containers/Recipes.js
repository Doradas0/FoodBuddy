import React, {useState} from "react";
import { API } from "aws-amplify";
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
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return(
    <Container>
      <Fab className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      { !isLoading &&
        <RecipeCard large recipe={recipes[0]} />
      }
    </Container>
  )
}
