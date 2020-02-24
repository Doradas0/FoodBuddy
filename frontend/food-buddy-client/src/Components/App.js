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
  const [currUser, setCurrUser] = useState(null);
  const [currUserInfo, setCurrUserInfo] = useState(null);
  const [recipeList, setRecipeList] = useState(null);

  React.useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      setCurrUser(await Auth.currentSession());
      setCurrUserInfo(await Auth.currentUserInfo());
      userHasAuthenticated(true);
    }
    catch(e) {
      console.log(e);
      if (e !== 'No current user') {
        if (e.message){
          alert(e.message)
        }else{
          alert(e);
        }
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <React.Fragment>
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <Routes appProps={{ isAuthenticated, userHasAuthenticated, currUser, currUserInfo, recipeList, setRecipeList }}/>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default withRouter(App);
