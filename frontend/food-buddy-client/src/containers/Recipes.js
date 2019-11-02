import React, {useState, useEffect} from "react";
import "./Recipes.css";
import { API } from "aws-amplify";
import NewButton from "../components/NewButton";
import RecipeCard from "../components/RecipeCard";
export default function Recipes(props) {

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    alert("Added Recipe");
  }

  return (
    <div className="Recipes">
      <h1>The page with the recipes</h1>
      <RecipeCard />
      <NewButton onClick={addRecipe}/>
    </div>
  );
}
