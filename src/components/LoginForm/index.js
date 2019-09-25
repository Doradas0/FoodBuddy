import React from 'react';
import './LoginForm.css';
import useForm from '../../utils/Hooks';

export default function LoginForm() {

  const handleLogin = () => {
    alert('Try again later');
  }
  const initialValues = {username:'username', password:'password'}
  const {inputs, handleInputChange, handleSubmit, handleOnClick} = useForm(handleLogin, initialValues);


  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <input type="text" name='username' onChange={handleInputChange} value={inputs.username} onClick={handleOnClick}/>
      <input type="password" name='password' onChange={handleInputChange} value={inputs.password} onClick={handleOnClick}/>
      <button type='submit'>Submit</button>
    </form>
  )
}
