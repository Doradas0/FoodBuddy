import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: "eu-west-1",
    userPoolId: "eu-west-1_EzyJ1xQBC",
    identityPoolId: "eu-west-1:fd38b2ef-bd80-403f-ae70-9d819f53eb9e",
    userPoolWebClientId: "56081sjmce6iu0s98dcbve51sr"
  },
})

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
