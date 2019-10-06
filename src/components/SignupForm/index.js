import React from "react";
import "./SignupForm.css";
import useForm from "../../utils/Hooks";
import {signUp} from "../../utils/AWSLibs";

export default (setEmail, setCodeSent) => {

  const handleSignup = async () => {
    try {
      await signUp(inputs.username, inputs.password);
    }catch (e) {
      console.log(e);
      return;
    }
    setEmail(() => inputs.username);
    setCodeSent(() => true);
  }
  const initialValues = {username:"", password:"", passwordConfirm:""}
  const {inputs, handleInputChange, handleSubmit, handleOnClick} = useForm(handleSignup, initialValues);


  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Email</legend>
        <input type="text" name="username" onChange={handleInputChange} value={inputs.username} onClick={handleOnClick}/>
      </fieldset>
      <fieldset>
        <legend>Password</legend>
        <input type="password" name="password" onChange={handleInputChange} value={inputs.password} onClick={handleOnClick}/>
      </fieldset>
      <fieldset>
        <legend>Confirm Password</legend>
        <input type="password" name="passwordConfirm" onChange={handleInputChange} value={inputs.passwordConfirm} onClick={handleOnClick}/>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}
