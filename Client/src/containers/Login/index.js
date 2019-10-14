import React from "react";
import "./Login.css";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import useForm from "../../utils/Hooks";

export default ({userHasAuthenticated, history}) => {

  const handleLogin = async () => {
  try {
    await Auth.signIn(inputs.email, inputs.password);
    userHasAuthenticated(true);
    history.push("/");
  } catch (e) {
    alert(e.message);
  }
}

  const initialValues = {email:"", password:""}
  const {inputs, handleInputChange, handleSubmit} = useForm(handleLogin, initialValues);

  const validateForm = () => {
    return inputs.email.length > 0 && inputs.password.length > 0;
  }

  return(
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            value={inputs.email}
            onChange={handleInputChange}
            type="email"
            name="email"
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={inputs.password}
            onChange={handleInputChange}
            type="password"
            name="password"
          />
        </FormGroup>
        <Button block size="lg" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
