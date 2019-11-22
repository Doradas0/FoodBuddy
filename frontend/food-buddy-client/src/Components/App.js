import React, {useState} from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from "./Theme";

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

  return (
    <React.Fragment>
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }}/>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default withRouter(App);
