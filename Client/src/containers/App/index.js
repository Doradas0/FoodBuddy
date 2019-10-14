import React, { useState, useEffect } from "react";
import "./App.css";
import Routes from "../../utils/Routes";
import Navbar from "../../components/Navbar";
import { Auth } from "aws-amplify";

const App = (props) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    // setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
  }

  // !isAuthenticating &&
  return (
    <div className="App container">
      <Navbar isAuthenticated={isAuthenticated} userHasAuthenticated={userHasAuthenticated} handleLogout={handleLogout}/>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
