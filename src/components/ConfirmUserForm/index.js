import React from "react";
import "./ConfirmUserForm.css";
import useForm from "../../utils/Hooks";
import {confirmSignUp} from "../../utils/AWSLibs";

export default (username, props) => {

  const handleConfirmSignup = () => {
    let $username;
    if(username){
      $username = username;
    }
    $username = inputs.username;
    confirmSignUp($username, inputs.code);
    alert("Succesfully Signed Up");
    props.history.push("/login");
  }
  const initialValues = {username:"", code:""}
  const {inputs, handleInputChange, handleSubmit, handleOnClick} = useForm(handleConfirmSignup, initialValues);


  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      {!inputs.username ?
        <fieldset>
          <legend>Email</legend>
          <input type="text" name="username" onChange={handleInputChange} value={inputs.username} onClick={handleOnClick}/>
        </fieldset> : null
      }
      <fieldset>
        <legend>Password</legend>
        <input type="password" name="password" onChange={handleInputChange} value={inputs.password} onClick={handleOnClick}/>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}
