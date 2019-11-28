export default {
  dev:{
    cognito: {
      REGION: "eu-west-1",
      USER_POOL_ID: "eu-west-1_GAYe9tDpz",
      APP_CLIENT_ID: "1fnklins9hln18jnff8i3qimqk",
      IDENTITY_POOL_ID: "eu-west-1:889a937c-c4a9-4163-a4bb-5387b74d3ac2"
    },
    apiGateway: {
      Recipes: {
        NAME: "Food_Buddy_Recipe",
        REGION: "eu-west-1",
        URL: "https://udm04yd5tf.execute-api.eu-west-1.amazonaws.com/dev"
      },
    },
  }
};
