import React, { useState } from "react";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    const newUser = await Auth.signUp({
      username: fields.email,
      password: fields.password
    });
    setIsLoading(false);
    setNewUser(newUser);
  } catch (e) {
    alert(e.message);
    setIsLoading(false);
  }
}

async function handleConfirmationSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    await Auth.confirmSignUp(fields.email, fields.confirmationCode);
    await Auth.signIn(fields.email, fields.password);

    props.userHasAuthenticated(true);
    props.history.push("/");
  } catch (e) {
    alert(e.message);
    setIsLoading(false);
  }
}

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>

      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        SignUp
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
