import React, {useState, useEffect} from "react";
import "./Recipes.css";
import { API } from "aws-amplify";
import NewButton from "../components/NewButton";
import RecipeCard from "../components/RecipeCard";
export default function Recipes(props) {

// eslint-disable-next-line
  const [recipes, setRecipes] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [showNewRecipe, setShowNewRecipe] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const recipes = await loadRecipes();
        setRecipes(recipes);
        console.log(recipes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadRecipes() {
    return API.get("recipes", "/recipes");
  }

  function addRecipe(){
    setShowNewRecipe(true);
  }

  const emptyRecipe = {
    title:"",
    ingredients:[],
    method:[],
    servings:"",
    time:"",
    attachment:""
  }

  return (
    <div className="Recipes">
      <h1>The page with the recipes</h1>
      <NewButton onClick={addRecipe}/>
      {showNewRecipe && <RecipeCard cardSize="Expanded" recipeData={emptyRecipe}/>}
    </div>
  );
}
