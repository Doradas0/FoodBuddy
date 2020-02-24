import { API } from "aws-amplify";

export const getRecipeList = () => {
  return API.get("Food_Buddy_Recipe", "/recipes")
}
