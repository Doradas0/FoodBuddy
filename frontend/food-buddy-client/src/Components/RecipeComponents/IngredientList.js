import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>({
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
  deleteBtn: {
    padding: "0px",
    width: ".5rem",
    background: "none",
    border: 0
  },
}));

export default ({recipeData, setRecipeData, ...props}) => {
  const classes=useStyles();

  const isDisabled=!props.editable;

  const changeIngredient = (e,i) => {
    let x = [...recipeData.ingredients];
    x[i][e.target.name]=e.target.value;
    let y = {...recipeData}
    y.ingredients = x;
    setRecipeData(y);
  }

  const removeLine = (e,i) => {
    let y = {...recipeData};
    y.ingredients.splice(i,1);
    setRecipeData(y);
  }

  const newLine = e => {
    let x = [...recipeData.ingredients];
    x.push({
      item:`Item ${(x.length+1).toString()}`,
      measurement:"Meas",
      quantity:"Qty"
    });
    let y = {...recipeData}
    y.ingredients = x;
    setRecipeData(y);
  }

  const ingredients = recipeData.ingredients.map((ingredient,i)=>(
    <div className={classes.ingredientLine} key={['ingredient', i].join('_')}>
      <InputBase
        disabled={isDisabled}
        className={classes.ingredientItem}
        onChange={(e)=>changeIngredient(e,i)}
        name="item"
        value={ingredient.item}
      />
      <InputBase
        disabled={isDisabled}
        className={classes.ingredientQuantity}
        onChange={(e)=>changeIngredient(e,i)}
        name="quantity"
        value={ingredient.quantity}

      />
      <InputBase
        disabled={isDisabled}
        className={classes.ingredientMeasurement}
        onChange={(e)=>changeIngredient(e,i)}
        name="measurement"
        value={ingredient.measurement}
      />
      {!isDisabled&&
      <button className={classes.deleteBtn} onClick={(e)=>removeLine(e,i)}>
        x
      </button>}
    </div>
  ));

  return(
    <ul className={classes.ingredientList}>
      {ingredients}
      {!isDisabled
        &&<Button onClick={newLine}>
          New Line
        </Button>}
    </ul>
  );
}
