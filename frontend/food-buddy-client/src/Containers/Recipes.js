import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getRecipeList, updateRecipe, createRecipe } from "../Libs/ApiLib";
import { s3Upload } from '../Libs/StorageLib';

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
  const [attachment, setAttachment] = useState(null);

  console.log(selectedRecipe);

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
        setFabType('edit');
      }
      if (!recipeId) {
        setSelectedRecipe(null);
        setFabType('new')
      }
    }
    onLoad();
  }, [isAuthenticated, recipeList, setRecipeList, recipeId]);

  const handleFabClick = async (event) => {
    if (fabType === "new") {
      setSelectedRecipe(EmptyRecipe)
      setFabType("save")
      setIsEditable(true)
    }
    if (fabType === "edit") {
      setFabType("save")
      setIsEditable(true)
    }
    if (fabType === "save") {
      try {
        await handleSave();
        setFabType("edit")
        setIsEditable(false)
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleSave = async () => {
    console.log(attachment);
    if (attachment) {
      s3Upload(attachment).then(async result => {
        console.log(result);
        await postRecipe(result);
      }).catch(err => {
        console.log(err);
      });
    }else {
      await postRecipe(null);
    }
    setRecipeList(await getRecipeList())
  }

  const postRecipe = async (attachment) => {
    selectedRecipe.attachment = attachment;
    if (!selectedRecipe.recipeId) {
      await createRecipe(selectedRecipe)
    }else {
      await updateRecipe(selectedRecipe)
    }
  }

  return(
    <Container className={classes.root}>
      <RecipeFab handleClick={handleFabClick} type={fabType}/>
      {selectedRecipe
        ?<RecipeCard recipe={selectedRecipe} setRecipe={setSelectedRecipe} attachment={attachment} setAttachment={setAttachment} expanded editable={isEditable} />
        :<RecipeList recipeList={recipeList} appProps={props} />
      }
    </Container>
  )
}
