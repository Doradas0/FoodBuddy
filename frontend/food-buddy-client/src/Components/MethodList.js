import React from "react";
import InputBase from '@material-ui/core/InputBase';

export default function MethodList({method, handleChange}){
  return method.map((step,i)=>(
    <input
      key={i}
      onChange={(e)=>handleChange({e,i})}
      name="method"
      value={step}
    />
  ));
}
