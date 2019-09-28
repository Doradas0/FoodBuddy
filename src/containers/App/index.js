import React from 'react';
import Routes from "../../utils/Routes";
import "./App.css";

import Navbar from '../../components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Routes />
    </div>
  );
}

export default App;
