import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import RecipeDefault from "../Res/Img/RecipeDefault.jpg";
import TimerIcon from '@material-ui/icons/Timer'
import LocalDiningIcon from '@material-ui/icons/LocalDining';;

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
    top: theme.spacing(26),
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
  console.log(props);

  const classes = useStyles();
  const [small, setSmall] = useState(!props.large);
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = index => {
    setTabValue(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
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
        <Typography component="p" variant="subtitle1" className={classes.basicInfo}>
          {recipe.title}
        </Typography>
        <Typography component="p" variant="subtitle1" className={classes.basicInfo}>
          <LocalDiningIcon fontSize="small" color="secondary"/>
          {recipe.servings}
        </Typography>
        <Typography component="p" variant="subtitle1" className={classes.basicInfo}>
          <TimerIcon fontSize="small" color="secondary"/>
          {recipe.cookTime}
        </Typography>
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
        <IngredientList ingredients={recipe.ingredients} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MethodList method={recipe.instructions}/>
      </TabPanel>
      </CardContent>
    </Card>
  )
}

function IngredientList({ingredients}){
  const classes = useStyles();

  return ingredients.map((ingredient,i)=>(
    <div className={classes.ingredientLine} key={i}>
      <Typography component="p" variant="subtitle2" className={classes.ingredientItem}>
        {ingredient.item}
      </Typography>
      <Typography component="p" variant="subtitle2" className={classes.ingredientQuantity}>
        {ingredient.quantity}
      </Typography>
      <Typography component="p" variant="subtitle2" className={classes.ingredientMeasurement}>
        {ingredient.measurement}
      </Typography>
    </div>
  ))
}

function MethodList({method}){
  const classes = useStyles();

  return method.map((step,i)=>(
      <Typography key={i} component="p" variant="subtitle2" className={classes.methodStep}>
        {step}
      </Typography>
  ))
}
