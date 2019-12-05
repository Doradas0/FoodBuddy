import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputBase from '@material-ui/core/InputBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RecipeDefault from "../Res/Img/RecipeDefault.jpg";
import TimerIcon from '@material-ui/icons/Timer';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

import TabPanel from "./TabPanel";

const useStyles = makeStyles(theme=>({
  smCard: {
    maxWidth: 345,
  },
  smContent: {
    display: "none"
  },
  card:{
    maxWidth: theme.breakpoints.values.sm,
    position: "relative"
  },
  media: {
    height: theme.spacing(30),
    opacity: 0.5,
  },
  basicInfoContainer: {
    textTransform: "capitalize",
    position: "absolute",
    display: "flex",
    top: theme.spacing(25),
    width: "100%",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  basicInfo: {
    margin: "0 6px",
    padding: "4px 0",
    color: theme.palette.primary.contrastText
  },
  basicInfoField:{
    display: "flex",
    alignItems:"center",
  },
  ingredientLine:{
    display: "flex",
    borderBottom: `2px dotted ${theme.palette.secondary.main}`
  },
  ingredientList: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    maxWidth: "500px",
    margin: "auto"
  },
  ingredientQuantity: {
    marginLeft: "auto",
    width: "20px"
  },
  ingredientMeasurement: {
    width: "60px"
  },
  methodList: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    maxWidth: "500px",
    margin: "auto"
  },
  methodStep: {
    borderBottom: `2px dotted ${theme.palette.secondary.main}`
  }
}));

export default function RecipeCard({recipe, ...props}){
  const classes = useStyles();

  const [small, setSmall] = useState(!props.large);
  const [tabValue, setTabValue] = useState(0);
  const [recipeData, setRecipeData] = useState({...recipe});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function setValue(e){
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value
    });
  }

  function changemethod({e,i}){
    let x = [...recipeData.instructions];
    x[i] = e.target.value;
    let y = {...recipeData}
    y.instructions = x;
    setRecipeData(y);
  }

  function changeIngredient({e,i}){
    let x = [...recipeData.ingredients];
    x[i][e.target.name]=e.target.value;
    let y = {...recipeData}
    y.ingredients = x;
    setRecipeData(y);
  }

  const handleSave = () => {
    // console.log(recipe);
    // let recipeData = {
    //   title:title,
    //   servings:servings,
    //   cookTime:cookTime,
    //   ingredients:ingredients,
    //   instructions:method
    // }
    // console.log(recipeData);
  }

  return(
    <Card
      className={`${small && classes.smCard} ${classes.card}`}
    >
      <CardMedia
        className={classes.media}
        image={RecipeDefault}
        title="Contemplative Reptile"
      />
      <div className={classes.basicInfoContainer}>
        <InputBase
          className={classes.basicInfo}
          onChange={setValue}
          name="title"
          value={recipeData.title}
        />
        <div className={classes.basicInfoField}>
          <LocalDiningIcon fontSize="small" color="secondary"/>
          <InputBase
            className={classes.basicInfo}
            onChange={setValue}
            name="servings"
            value={recipeData.servings}
          />
        </div>
        <div className={classes.basicInfoField}>
          <TimerIcon fontSize="small" color="secondary"/>
          <InputBase
            className={classes.basicInfo}
            onChange={setValue}
            name="cookTime"
            value={recipeData.cookTime}
          />
        </div>
      </div>
      <CardContent
        className={`${small && classes.smContent} ${classes.content}`}
      >
      <Tabs centered value={tabValue} onChange={handleTabChange} className={classes.tabs}>
        <Tab label="Ingredients"/>
        <Tab label="Method"/>
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <IngredientList $ingredients={recipeData.ingredients} changeIngredient={changeIngredient}/>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MethodList method={recipeData.instructions} changemethod={changemethod}/>
      </TabPanel>

      </CardContent>
      <button onClick={handleSave}>
        Save
      </button>
    </Card>
  )
}

function MethodList({method,...props}){
  const classes=useStyles();
  const steps = method.map((step,i)=>(
    <InputBase
      key={['step', i].join('_')}
      onChange={(e)=>props.changemethod({e,i})}
      value={step}
      className={classes.methodStep}
    />
  ));
  return(
    <ul className={classes.methodList}>
      {steps}
    </ul>
  )
}

function IngredientList({$ingredients,...props}){
  const classes=useStyles();
  const ingredients = $ingredients.map((ingredient,i)=>(
    <div className={classes.ingredientLine} key={['ingredient', i].join('_')}>
      <InputBase
        className={classes.ingredientItem}
        onChange={(e)=>props.changeIngredient({e,i})}
        name="item"
        value={ingredient.item}
      />
      <InputBase
        className={classes.ingredientQuantity}
        onChange={(e)=>props.changeIngredient({e,i})}
        name="quantity"
        value={ingredient.quantity}

      />
      <InputBase
        className={classes.ingredientMeasurement}
        onChange={(e)=>props.changeIngredient({e,i})}
        name="measurement"
        value={ingredient.measurement}
      />
    </div>
  ));
  return(
    <ul className={classes.ingredientList}>
      {ingredients}
    </ul>
  )
}
