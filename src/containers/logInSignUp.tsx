import React from "react";
import { useAppSelector } from "../hooks";

const LogInSignUp = () => {
  const bool: boolean  = useAppSelector((state) => state.users.loggedIn)
  return (
    <div className="login">
      <p>Login</p>
      <input
        type='username'
        name='username'
        placeholder='Username'
        autoComplete='off'
      />
      <br />
      <input
        type='password'
        name='password'
        placeholder='Password'
      />
      
    </div>
  )
}

export default LogInSignUp;