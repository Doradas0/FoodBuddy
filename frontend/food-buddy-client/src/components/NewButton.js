import React from "react";
import "./NewButton.css";
export default function NewButton({onClick, ...props}) {
  return(
    <button className="NewButton" onClick={onClick}>+</button>
  )
}
