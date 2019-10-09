import React from "react";
import "./ConfirmUserForm.css";
import useForm from "../../utils/Hooks";
import {Auth} from "aws-amplify";

export default ({username, props}) => {

  const handleConfirmSignup = async () => {
    let $username;
    if(username){
      $username = username;
    }else{
      $username = inputs.username;
    }
    try {
      await Auth.confirmSignUp($username,inputs.code);
      alert("Succesfully Signed Up");
      props.history.push("/login");
    } catch (e) {
      alert(e.message);
      return;
    }
  }

  const initialValues = {username:"", code:""}
  const {inputs, handleInputChange, handleSubmit, handleOnClick} = useForm(handleConfirmSignup, initialValues);

  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      {!username ?
        <fieldset>
          <legend>Email</legend>
          <input type="text" name="username" onChange={handleInputChange} value={inputs.username} onClick={handleOnClick}/>
        </fieldset> : null
      }
      <fieldset>
        <legend>Confirmation Code</legend>
        <input type="number" name="code" onChange={handleInputChange} value={inputs.code} onClick={handleOnClick}/>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}
