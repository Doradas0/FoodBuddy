import React, { useState } from "react";
import { API } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import InputBase from '@material-ui/core/InputBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import RecipeDefault from "../Res/Img/RecipeDefault.jpg";
import TimerIcon from '@material-ui/icons/Timer';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

import TabPanel from "./TabPanel";

const useStyles = makeStyles(theme=>({
  card:{
    maxWidth: theme.breakpoints.sm
  },
  content:{
    paddingTop: 0,
  },
  media: {
    height: theme.spacing(30),
    opacity: 0.5,
  },
  basicInfoContainer: {
    textTransform: "capitalize",
    display: "grid",
    gridTemplateColumns: "1fr 85px 75px",
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
    margin: "auto",
  },
  ingredientQuantity: {
    marginLeft: "auto",
    width: "30px"
  },
  ingredientMeasurement: {
    width: "70px",
  },
  methodList: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    maxWidth: "500px",
    margin: "auto",
  },
  methodStep: {
    borderBottom: `2px dotted ${theme.palette.secondary.main}`,
    display: "flex",
    justifyContent: "space-between",
  },
  deleteBtn: {
    padding: "0px",
    width: ".5rem",
    background: "none",
    border: 0
  },
  tag: {
    margin: theme.spacing(0.2,0.2)
  },
  tagInput: {
    width: "100%",
    padding: theme.spacing(0.5),
  },
}));

export default function RecipeCard({recipe, appProps, ...props}){
  const classes = useStyles();
  const [small, setSmall] = useState(!props.large);
  const [tabValue, setTabValue] = useState(0);
  const [recipeData, setRecipeData] = useState({...recipe});
  const [isSaved, setisSaved] = useState(true);
  const [newTag, setNewTag] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function setValue(e){
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value
    });
    setisSaved(false);
  }

  function changemethod(e,i){
    let x = [...recipeData.method];
    x[i] = e.target.value;
    let y = {...recipeData}
    y.method = x;
    setRecipeData(y);
    setisSaved(false);
  }

  function changeIngredient(e,i){
    let x = [...recipeData.ingredients];
    x[i][e.target.name]=e.target.value;
    let y = {...recipeData}
    y.ingredients = x;
    setRecipeData(y);
    setisSaved(false);
  }

  function newLine(e){
    e.preventDefault();
    if(tabValue === 0){
      let x = [...recipeData.ingredients];
      x.push({
        item:`Item ${(x.length+1).toString()}`,
        measurement:"Meas",
        quantity:"Qty"
      });
      let y = {...recipeData}
      y.ingredients = x;
      setRecipeData(y);
      setisSaved(false);
    }else if (tabValue === 1) {
      let x = [...recipeData.method];
      x.push(`Step ${(x.length+1).toString()}`)
      let y = {...recipeData}
      y.method = x;
      setRecipeData(y);
      setisSaved(false);
    }else {
      console.log("err");
    }
  }

  function removeLine(e,i,list){
    e.preventDefault();
    let y = {...recipeData};
    y[list].splice(i,1);
    setRecipeData(y);
    setisSaved(false);
  }

  function addTag(e) {
    if (e.key === "Enter" && newTag !== "") {
      let y = {...recipeData};
      y["tags"].push(newTag);
      setRecipeData(y);
      setNewTag("");
      setisSaved(false);
    };
  }

  function removeTag(i) {
    console.log(i);
    let y = {...recipeData};
    y["tags"].splice(i,1);
    setRecipeData(y);
    setisSaved(false);
  }

  const handleSave = async () => {
    try {
      if (recipeData.recipeId) {
        await updateRecipe()
      }else {
        await createRecipe()
      }
      setisSaved(true);
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

  const handleActionArea = (e) => {
    if(!small){return}
    props.handleRecipeSelect(recipeData);
  }

  return(
    <Card
      className={classes.card}
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
      <TagList
        tags={recipeData.tags}
        removeTag={removeTag}
        className={classes.tagList}
      />
      <CardContent
        className={`${small && classes.smContent} ${classes.content}`}
      >
        <TextField
        variant="outlined"
        size="small"
        className={classes.tagInput}
        onChange={(e)=>setNewTag(e.target.value)}
        onKeyUp={addTag}
        name="newTag"
        value={newTag}
        placeholder="press enter to add tag"
        />
        <Tabs centered value={tabValue} onChange={handleTabChange} className={classes.tabs}>
          <Tab label="Ingredients"/>
          <Tab label="Method"/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <IngredientList $ingredients={recipeData.ingredients} changeIngredient={changeIngredient} newLine={newLine} removeLine={removeLine}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <MethodList method={recipeData.method} changemethod={changemethod} newLine={newLine} removeLine={removeLine}/>
        </TabPanel>

      </CardContent>
      {!isSaved &&
        <IconButton onClick={handleSave} color="primary">
          <SaveTwoToneIcon/>
        </IconButton>
      }
    </Card>
  )
}

function MethodList({method,...props}){
  const classes=useStyles();
  const steps = method.map((step,i)=>(
    <div
      className={classes.methodStep}
      key={['step', i].join('_')}
    >
      <InputBase
        multiline
        onChange={(e)=>props.changemethod(e,i)}
        value={step}
      />
      <button className={classes.deleteBtn} onClick={(e)=>props.removeLine(e,i,"method")}>
        x
      </button>
    </div>
  ));
  return(
    <ul className={classes.methodList}>
      {steps}
      <NewLineButton newLine={props.newLine}/>
    </ul>
  )
}

function IngredientList({$ingredients,...props}){
  const classes=useStyles();
  const ingredients = $ingredients.map((ingredient,i)=>(
    <div className={classes.ingredientLine} key={['ingredient', i].join('_')}>
      <InputBase
        className={classes.ingredientItem}
        onChange={(e)=>props.changeIngredient(e,i)}
        name="item"
        value={ingredient.item}
      />
      <InputBase
        className={classes.ingredientQuantity}
        onChange={(e)=>props.changeIngredient(e,i)}
        name="quantity"
        value={ingredient.quantity}

      />
      <InputBase
        className={classes.ingredientMeasurement}
        onChange={(e)=>props.changeIngredient(e,i)}
        name="measurement"
        value={ingredient.measurement}
      />
      <button className={classes.deleteBtn} onClick={(e)=>props.removeLine(e,i,"ingredients")}>
        x
      </button>
    </div>
  ));
  return(
    <ul className={classes.ingredientList}>
      {ingredients}
      <NewLineButton newLine={props.newLine}/>
    </ul>
  );
};

function NewLineButton({newLine}){
  return(
    <Button onClick={newLine}>
      New Line
    </Button>
  );
};

const TagList = ({tags, ...props}) => {
  const classes = useStyles();
  if(!tags){
    return;
  }
  return tags.map((tag,i) => (
    <Chip
      key={i}
      label={tag}
      className={classes.tag}
      onDelete={()=>props.removeTag(i)}
      color="secondary"
      variant="outlined"
    />
  ));
}
