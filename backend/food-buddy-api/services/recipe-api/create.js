import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log(data);
  const params = {
    TableName: "dev-recipes",

    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      recipeId: uuid.v1(),
      description: data.description,
      title: data.title,
      ingredients: data.ingredients,
      method: data.method,
      servings: data.servings,
      cookTime:data.cookTime,
      tags: data.tags,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
