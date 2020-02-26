import { API } from "aws-amplify";

export const getRecipeList = () => {
  return API.get("Food_Buddy_Recipe", "/recipes")
}

export const updateRecipe = (recipeData) => {
  return API.put("Food_Buddy_Recipe", `/recipes/${recipeData.recipeId}`, {
    body: recipeData
  });
}

export const createRecipe = (recipeData) => {
  return API.post("Food_Buddy_Recipe", "/recipes", {
    body: recipeData
  });
}
