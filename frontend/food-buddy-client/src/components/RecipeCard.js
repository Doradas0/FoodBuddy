import React from "react";
import "./RecipeCard.css";
import DefaultImage from "../res/RecipeDefaultImage.jpg";

export default function RecipeCard(props) {
  return(
    <div className={"RecipeCard " + props.cardSize}>
      <div className="RecipeHeader">
        <img className="RecipeImage" src={DefaultImage} alt=""/>
        <div className="RecipeInfo">
          <h1 className="RecipeTitle">Title</h1>
          <h1 className="RecipeTime">Time</h1>
          <h1 className="RecipeServings">Servings</h1>
        </div>
      </div>
      <div className="RecipeIngredients">

      </div>
      <div className="RecipeInstructions">

      </div>
    </div>
  )
}
