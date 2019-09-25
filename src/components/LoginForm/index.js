import React, {useState} from 'react';
import './LoginForm.css';

export default function LoginForm() {

  const [username] = useState('Username');
  const [password] = useState('Password')

  return (
    <form className="LoginForm">
      <input type="text" value={username}/>
      <input type="text" value={password}/>
    </form> 
  )
}
