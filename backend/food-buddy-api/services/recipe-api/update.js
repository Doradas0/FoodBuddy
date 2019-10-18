import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async funtion main(event, context){
  const data = JSON.parse(event.body);
  const params = {
    TableName:"dev-recipes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      recipeId: event.pathParameters.id
    },
    UpdateExpression: "SET name = :name, ingredients = :ingredients, method = :method, servings = :servings, time = :time, tags = :tags, attachment = :attachment",
    ExpressionAttributeValues: {
      ":name": data.name || null,
      ":ingredients": data.ingredients || null,
      ":method": data.method || null,
      ":servings": data.servings || null,
      ":time": data.time || null,
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
