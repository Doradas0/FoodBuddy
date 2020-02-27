import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';

import Config from "./Components/Config";
import App from './Components/App';

const stage = "dev"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: Config[stage].cognito.REGION,
    userPoolId: Config[stage].cognito.USER_POOL_ID,
    identityPoolId: Config[stage].cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: Config[stage].cognito.APP_CLIENT_ID
  },
  API: {
   endpoints: [
     {
       name: Config[stage].apiGateway.Recipes.NAME,
       endpoint: Config[stage].apiGateway.Recipes.URL,
       region: Config[stage].apiGateway.Recipes.REGION,
     },
   ]
 },
 Storage: {
   region: Config[stage].s3.REGION,
   bucket: Config[stage].s3.BUCKET,
   identityPoolId: Config[stage].cognito.IDENTITY_POOL_ID
 }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
