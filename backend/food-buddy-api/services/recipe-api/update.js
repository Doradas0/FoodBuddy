import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context){
  const data = JSON.parse(event.body);
  const params = {
    TableName:"dev-recipes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      recipeId: event.pathParameters.id
    },
    UpdateExpression: "SET title = :title, ingredients = :ingredients, instructions = :instructions, servings = :servings, cookTime = :cookTime, tags = :tags, attachment = :attachment",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":ingredients": data.ingredients || null,
      ":instructions": data.instructions || null,
      ":servings": data.servings || null,
      ":cookTime": data.cookTime || null,
      ":tags": data.tags || null,
      ":attachment": data.attachment || null
    },
    ReturnValue: "ALL_NEW"
  };

  try{
    await dynamoDbLib.call("update", params);
    return success({status: true});
  }catch(e){
    return failure({status: false});
  }
}
