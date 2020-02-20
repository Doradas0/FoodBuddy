import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>({
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
}));

export default ({recipeData, setRecipeData, ...props}) => {
  const classes=useStyles();

  const isDisabled=!props.editable;

  const changeMethod = (e,i) => {
    let x = [...recipeData.method];
    x[i] = e.target.value;
    let y = {...recipeData}
    y.method = x;
    setRecipeData(y);
  }

  const removeLine = (e,i) => {
    let y = {...recipeData};
    y.method.splice(i,1);
    setRecipeData(y);
  }

  const newLine = e => {
    let x = [...recipeData.method];
    x.push(`Step ${(x.length+1).toString()}`)
    let y = {...recipeData}
    y.method = x;
    setRecipeData(y);
  }

  const steps = recipeData.method.map((step,i)=>(
    <div
      className={classes.methodStep}
      key={['step', i].join('_')}
    >
      <InputBase
        disabled={isDisabled}
        multiline
        onChange={(e)=>changeMethod(e,i)}
        value={step}
      />
      {!isDisabled&&
        <button className={classes.deleteBtn} onClick={(e)=>removeLine(e,i)}>
          x
        </button>
      }
    </div>
  ));
  return(
    <ul className={classes.methodList}>
      {steps}
      {!isDisabled&&
        <Button onClick={newLine}>
          New Line
        </Button>}
    </ul>
  );
}
