import React from "react";
import "./App.css";
import Routes from "../../utils/Routes";
import Navbar from "../../components/Navbar";

function App(props) {
  return (
    <div className="App container">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
