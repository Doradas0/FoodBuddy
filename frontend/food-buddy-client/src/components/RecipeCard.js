import React, {useState} from "react";
import "./RecipeCard.css";
import DefaultImage from "../res/RecipeDefaultImage.jpg";
import RecipeIngredient from "./RecipeIngredient";

export default function RecipeCard({cardSize, ...props}) {
  const [recipeData, setRecipeData] = useState(props.recipeData);
  const [hideIngredients, setHideIngredients] = useState("");
  const [hideInstructions, setHideInstructions] = useState("hide");

  const handleNewLine = e => {
    e.preventDefault();
    if(!hideIngredients){
      setRecipeData({
        ...recipeData,
        ingredients:[{item:"item", quantity:"qty", measurement:"meas"}, ...recipeData.ingredients]
      });
    }
    if(!hideInstructions){
      setRecipeData({
        ...recipeData,
        method:[...recipeData.method, "New Step"]
      });
    }
  }

  console.log(recipeData);

  const handleValueChange = e => {
    e[1].persist();
    let $recipeData = {...recipeData};
    let $ingredients = {...recipeData.ingredients[e[0]]}
    $ingredients = {...$ingredients, [e[1].target.id]:e[1].target.value}
    $recipeData.ingredients[e[0]] = $ingredients;
    setRecipeData({
      ...$recipeData
    });
  }

  const handleInstructionChange = e => {
    e.event.persist()
    console.log(e);
    let $recipeData = {...recipeData};
    $recipeData.method[e.index] = e.event.target.value;
    setRecipeData({
      ...$recipeData
    });
  }

  const showIngredients = (e) =>{
    e.preventDefault();
    setHideIngredients("");
    setHideInstructions("hide");
  }
  const showInstructions = (e) =>{
    e.preventDefault();
    setHideIngredients("hide");
    setHideInstructions("");
  }

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
      <div className="RecipeContent">
        <div className="RecipeNavigation">
          <h2 onClick={showIngredients}>Ingredients</h2>
          <h2 onClick={showInstructions}>Method</h2>
        </div>
        <div className={"RecipeIngredients " + hideIngredients}>
          <RecipeIngredientList ingredients={recipeData.ingredients} handleValueChange={handleValueChange}/>
        </div>
        <div className={"RecipeInstructions " + hideInstructions}>
          <RecipeInstructionsList instructions={recipeData.method} handleInstructionChange={handleInstructionChange} />
        </div>
        <button className="RecipeNewLineBtn" onClick={handleNewLine}>+</button>
      </div>
    </div>
  )
}

function RecipeIngredientList({ingredients, ...props}) {
  if(ingredients.length <=0)return "";
  return (
    ingredients.map((ingredient, i) =>
      <RecipeIngredient
        key={i}
        quantity={ingredient.quantity}
        measurement={ingredient.measurement}
        item={ingredient.item}
        handleValueChange={(e) => props.handleValueChange([i,e])}
      />
    )
  )
}

function RecipeInstructionsList({instructions, handleInstructionChange}){
  if(instructions.length <=0)return "";
  return(
    instructions.map((instruction, i) =>
      <input key={i} type="text" value={instruction} onChange={(e) => handleInstructionChange({index:i, event:e})} />
    )
  )
}
