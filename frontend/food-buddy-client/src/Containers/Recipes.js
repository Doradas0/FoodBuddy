import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getRecipeList, updateRecipe, createRecipe } from "../Libs/ApiLib";
import { s3Upload } from '../Libs/StorageLib';

import RecipeList from "../Components/RecipeList";
import RecipeCard from "../Components/RecipeCard";
import RecipeFab from '../Components/RecipeFab';
import EmptyRecipe from "../Components/EmptyRecipe";

import Container from '@material-ui/core/Container';

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

export default function Recipes({ recipeList, setRecipeList, isAuthenticated, ...props } ){
  const classes = useStyles();

  const recipeId = props.match.params.id;
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [fabValue, setFabValue] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [attachment, setAttachment] = useState(null);

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
        setFabValue(1);
      }
      if (!recipeId) {
        setSelectedRecipe(null);
        setFabValue(0)
      }
    }
    onLoad();
  }, [isAuthenticated, recipeList, setRecipeList, recipeId]);

  const handleFabClick = async (event) => {
    if (fabValue === 0) {
      setSelectedRecipe(EmptyRecipe)
      setFabValue(2)
      setIsEditable(true)
    }
    if (fabValue === 1) {
      setFabValue(2);
      setIsEditable(true)
    }
    if (fabValue === 2) {
      try {
        await handleSave();
        setFabValue(1)
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

  const fabs = [
    {
      color: 'primary',
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'primary',
      icon: <SaveOutlinedIcon />,
      label: 'Save',
    }
  ]

  return(
    <Container className={classes.root}>
      <RecipeFab handleClick={handleFabClick} fabs={fabs} value={fabValue}/>
      {selectedRecipe
        ?<RecipeCard recipe={selectedRecipe} setRecipe={setSelectedRecipe} attachment={attachment} setAttachment={setAttachment} expanded editable={isEditable} />
        :<RecipeList recipeList={recipeList} appProps={props} />
      }
    </Container>
  )
}
