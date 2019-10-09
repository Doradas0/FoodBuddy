import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import Config from "./utils/Config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: Config.cognito.REGION,
    userPoolId: Config.cognito.USER_POOL_ID,
    identityPoolId: Config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: Config.cognito.APP_CLIENT_ID
  },
})

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
