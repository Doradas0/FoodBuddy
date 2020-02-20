import React, { useState } from "react";
import { API } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';

import RecipeDefault from "../Res/Img/RecipeDefault.jpg";
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';


import TabPanel from "./TabPanel";

import RecipeBasicInfo from './RecipeComponents/RecipeBasicInfo';
import TagList from './RecipeComponents/TagList';
import NewTag from './RecipeComponents/NewTag';
import IngredientList from './RecipeComponents/IngredientList';
import MethodList from './RecipeComponents/MethodList';


const useStyles = makeStyles(theme=>({
  card:{
    maxWidth: theme.breakpoints.values.sm,
    margin: "auto"
  },
  content:{
    paddingTop: 0,
  },
  media: {
    height: theme.spacing(30),
    opacity: 0.5,
  },
}));

export default function RecipeCard({recipe, appProps, ...props}){
  const classes = useStyles();

  const isEditable=props.editable;

  const [tabValue, setTabValue] = useState(0);
  const [recipeData, setRecipeData] = useState({...recipe});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    try {
      if (recipeData.recipeId) {
        await updateRecipe()
      }else {
        await createRecipe()
      }
    } catch (e) {
      alert("Unable to save");
      console.log(e);
    }
  }

  const updateRecipe = () => {
    return API.put("Food_Buddy_Recipe", `/recipes/${recipeData.recipeId}`, {
      body: recipeData
    });
  }

  const createRecipe = () => {
    let y = {...recipeData};
    y.userId = appProps.currUserInfo.id;
    return API.post("Food_Buddy_Recipe", "/recipes", {
      body: recipeData
    });
  }

  const CollapsedRecipeCard = () =>(
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={RecipeDefault}
        title="Contemplative Reptile"
      />
      <RecipeBasicInfo setRecipeData={setRecipeData} recipeData={recipeData}/>
      <TagList setRecipeData={setRecipeData} recipeData={recipeData}/>
    </Card>
  );

  const ExpandedRecipeCard = () =>(
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={RecipeDefault}
        title="Default Dish Image"
      />
      <RecipeBasicInfo editable={isEditable} setRecipeData={setRecipeData} recipeData={recipeData}/>
      <TagList editable={isEditable} setRecipeData={setRecipeData} recipeData={recipeData}/>
      <CardContent className={classes.content}>
      {isEditable&&
        <NewTag setRecipeData={setRecipeData} recipeData={recipeData}/>
      }
        <Tabs centered value={tabValue} onChange={handleTabChange} className={classes.tabs}>
          <Tab label="Ingredients"/>
          <Tab label="Method"/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <IngredientList editable={isEditable} setRecipeData={setRecipeData} recipeData={recipeData}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <MethodList editable={isEditable} setRecipeData={setRecipeData} recipeData={recipeData} />
        </TabPanel>

      </CardContent>
      {isEditable&&
      <IconButton onClick={handleSave} color="primary">
        <SaveTwoToneIcon/>
      </IconButton>}
    </Card>
  );

  return (props.expanded
    ?<ExpandedRecipeCard />
    :<CollapsedRecipeCard />
  );

}
