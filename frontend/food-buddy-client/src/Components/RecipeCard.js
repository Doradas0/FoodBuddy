import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
  card:{
    maxWidth: theme.breakpoints.values.sm,
    position: "relative"
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
    display: "flex",
    alignItems:"center",
    margin: "0 6px",
    padding: "4px 0"
  },
  media: {
    height: theme.spacing(30),
    opacity: 0.5,
  },
  smContent: {
    display: "none"
  },
  tabs: {
  },
  content: {
    padding: 0
  },
  ingredientLine:{
    display: "flex",
  },
}));

export default function RecipeCard({recipe, ...props}){
  const classes = useStyles();

  const [small, setSmall] = useState(!props.large);
  const [tabValue, setTabValue] = useState(0);

  const [title, setTitle] = useState(recipe.title);
  const [servings, setServings] = useState(recipe.servings);
  const [cookTime, setCookTime] = useState(recipe.cookTime);
  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const [method, setMethod] = useState([...recipe.instructions]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function changemethod({e,i}){
    let x = [...method];
    x[i] = e.target.value;
    setMethod(x);

  }

  function MethodList({method}){
    return method.map((step,i)=>(
      <input
        key={['step', i].join('_')}
        onChange={(e)=>changemethod({e,i})}
        value={step}
      />
    ));
  }

  function IngredientList({ingredients}){
    return ingredients.map((ingredient,i)=>(
      <div className={classes.ingredientLine} key={['ingredient', i].join('_')}>
        <Typography component="p" variant="subtitle2" className={classes.ingredientItem}>
          {ingredient.item}
        </Typography>
        <Typography component="p" variant="subtitle2" className={classes.ingredientQuantity}>
          {ingredient.quantity}
        </Typography>
        <InputBase
          key={i}
          className={classes.ingredientMeasurement}
          name="quantity"
          value={ingredient.measurement}
        />
      </div>
    ))
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
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
        />
        <div className={classes.basicInfo}>
          <LocalDiningIcon fontSize="small" color="secondary"/>
          <InputBase
            onChange={(e) => setServings(e.target.value)}
            name="servings"
            value={servings}
            type="number"
          />
        </div>
        <div className={classes.basicInfo}>
          <TimerIcon fontSize="small" color="secondary"/>
          <InputBase
            onChange={(e) => setCookTime(e.target.value)}
            name="cookTime"
            value={cookTime}
            type="number"
          />
        </div>
      </div>
      <CardContent
        className={`${small && classes.smContent} ${classes.content}`}
      >
      <Typography component="p" variant="body1">
        Description
      </Typography>

      <Tabs centered value={tabValue} onChange={handleTabChange} className={classes.tabs}>
        <Tab label="Ingredients"/>
        <Tab label="Method"/>
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <IngredientList ingredients={ingredients} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MethodList method={method}/>
      </TabPanel>

      </CardContent>
    </Card>
  )
}
