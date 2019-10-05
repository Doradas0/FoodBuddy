import React from "react";
import "./LoginForm.css";
import useForm from "../../utils/Hooks";
import {signIn} from "../../utils/AWSLibs";

export default () => {

  const handleLogin = () => {
    signIn(inputs.username, inputs.password);
  }
  const initialValues = {username:"", password:""}
  const {inputs, handleInputChange, handleSubmit, handleOnClick} = useForm(handleLogin, initialValues);


  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Email</legend>
        <input type="text" name="username" onChange={handleInputChange} value={inputs.username} onClick={handleOnClick}/>
      </fieldset>
      <fieldset>
        <legend>Password</legend>
        <input type="password" name="password" onChange={handleInputChange} value={inputs.password} onClick={handleOnClick}/>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}
