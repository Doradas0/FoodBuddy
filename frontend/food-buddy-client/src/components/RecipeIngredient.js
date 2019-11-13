import React from "react";
import { useFormFields } from "../libs/hooksLib";
import "./RecipeIngredient.css";

export default function RecipeIngredient({handleValueChange, ...props}){
  return(
    <ul className="RecipeIngredient">
      <input className="RecipeIngredientInput" type="text" id="item" value={props.item} onChange={handleValueChange}/>
      <input className="RecipeIngredientInput" type="text" id="quantity" value={props.quantity} onChange={handleValueChange}/>
      <input className="RecipeIngredientInput" type="text" id="measurement" value={props.measurement} onChange={handleValueChange}/>
    </ul>
  )
}
