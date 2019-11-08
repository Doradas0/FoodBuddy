import React from "react";
import "./RecipeCard.css";
import DefaultImage from "../res/RecipeDefaultImage.jpg";
import RecipeIngredient from "./RecipeIngredient";

export default function RecipeCard({cardSize, ...props}) {
  return(
    <div className={"RecipeCard " + cardSize}>
      <div className="RecipeHeader">
        <img className="RecipeImage" src={DefaultImage} alt=""/>
        <div className="RecipeInfo">
          <h1 className="RecipeTitle">Title</h1>
          <h1 className="RecipeTime">Time</h1>
          <h1 className="RecipeServings">Servings</h1>
        </div>
      </div>
      <div className="RecipeIngredients">
        <RecipeIngredient quantity="Quantity" measurement="Measurement" item="Item"/>
        <RecipeIngredientList />
      </div>

      <div className="RecipeInstructions">

      </div>
    </div>
  )
}

function RecipeIngredientList() {
  return(
    <h1>Test</h1>
  )
}
