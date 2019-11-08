import React from "react";
import "./RecipeIngredient.css";

export default function RecipeIngredient({quantity, measurement, item, props}){
  return(
    <ul className="RecipeIngredient">
      <li className="RecipeIngredientQuantity">{quantity}</li>
      <li className="RecipeIngredientMeasure">{measurement}</li>
      <li className="RecipeIngredientItem">{item}</li>
    </ul>
  )
}
