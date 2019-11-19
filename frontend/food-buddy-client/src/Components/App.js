import React, {useState} from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from "../Libs/Routes";

const App = () => {
  // App State
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // React.useEffect(() => {
  //   onLoad();
  // }, []);
  //
  // async function onLoad() {
  //   try {
  //     await Auth.currentSession();
  //     userHasAuthenticated(true);
  //   }
  //   catch(e) {
  //     if (e !== 'No current user') {
  //       alert(e);
  //     }
  //   }
  //
  //   setIsAuthenticating(false);
  // }

  // <Header appProps={{ isAuthenticated, userHasAuthenticated }}/>
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }}/>
    </React.Fragment>
  );
}

export default withRouter(App);
