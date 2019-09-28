import React, {useState} from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

export default () => {
  const [isExpanded, toggleExpanded] = useState(false)

  const collapse = () => {
    toggleExpanded(false);
  }

  return(
    <div className="Navbar">
      <div className="Brand">
        <Link to="/">Food Buddy</Link>
      </div>
      <span className="menuToggle" onClick={() => toggleExpanded(!isExpanded)}>
        <svg width="30" height="30">
          <path d="M0,5 30,5" stroke="#333" strokeWidth="5"/>
          <path d="M0,14 30,14" stroke="#333" strokeWidth="5"/>
          <path d="M0,23 30,23" stroke="#333" strokeWidth="5"/>
        </svg>
      </span>
      <div className="Nav">
        <ul className={isExpanded ? "expanded" : "collapsed"}>
          <Link to="/RecipeBook" onClick={collapse}><li>Recipe Book</li></Link>
          <Link to="/MenuPlan" onClick={collapse}><li>Menu Plan</li></Link>
          <Link to="/Pantry" onClick={collapse}><li>Pantry</li></Link>
        </ul>
      </div>
    </div>

  );
}
