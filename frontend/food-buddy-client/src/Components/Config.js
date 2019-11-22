export default {
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_twKbMBybz",
    APP_CLIENT_ID: "3leikipjr3llm2i3ncpe3muh4o",
    IDENTITY_POOL_ID: "eu-west-2:77e6b2bd-5f7b-41d9-a518-98edee4a7c52"
  },
  apiGateway: {
    NewsFeed: {
      NAME: "CTG_NewsFeed_Data",
      REGION: "eu-west-2",
      URL: "https://q93rl6a482.execute-api.eu-west-2.amazonaws.com/Beta"
    },
    VideoChannel: {
      NAME: "CTG_VideoGallery_Data",
      REGION: "eu-west-2",
      URL: "https://89dhkyev4h.execute-api.eu-west-2.amazonaws.com/Beta"
    },
    Emotions: {
      NAME: "CTG_Emotion",
      REGION: "eu-west-2",
      URL: "https://06ns53bem8.execute-api.eu-west-2.amazonaws.com/Beta"
    },
    Key: {
      NAME: "CTG_Key_Access",
      REGION: "eu-west-2",
      URL: "https://rcij4909b6.execute-api.eu-west-2.amazonaws.com/Beta"
    },
    QuestionMark: {
      NAME: "QuestionMark",
      REGION: "eu-west-2",
      URL: "https://7lkkzoaznf.execute-api.eu-west-2.amazonaws.com/Dev"
    }
  },
  s3: {
    REGION: "eu-west-2",
    BUCKET: "changethegame-userfiles-mobilehub-244488926"
  },
  interactions: {
    bots:{
      CTG_FeedBack_Bot : {
        NAME: "CTG_FeedBack_Bot",
        REGION: "eu-west-1",
        ALIAS: "$LATEST"
      }
    }
  },
  analytics: {
    APPID:"c0b57b89b9564d3da2ed8ee0d5e44f84",
    REGION:"us-east-1"
  }
};
