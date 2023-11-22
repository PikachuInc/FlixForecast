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
    console.log(user);
    if (response.status === 200) {
      dispatch(login({ username: user.username, userID: user.userID }));
      navigate("/");
    }
  };

  return (
    <div className="login">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
        />
        <br />
        <input type="text" name="password" placeholder="Password" />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInSignUp;
