import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks.ts";
import { useNavigate } from "react-router";
import { login } from "../features/userSlice.ts";

const LogInSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username: string = e.target[0].value;
    const password: string = e.target[1].value;
    const body = JSON.stringify({
      username: username,
      password: password,
    });
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: body,
    });
    const user = await response.json();
    if (response.status === 200) {
      dispatch(login({ username: user.username, userID: user.userID }));
      navigate("/");
    }
  };

  return (
    <div
      className='login'
      style={{
        backgroundColor: '#eaeaea',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '300px',
        margin: 'auto',
      }}
    >
      <p style={{ fontSize: '30px', marginBottom: '20px', color: 'black' }}>
        Login
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          autoComplete='off'
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Password'
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <button
          type='submit'
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogInSignUp;
