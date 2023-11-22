import React, { useState } from "react";
import Searched from "./Searched";
import ToWatch from "./ToWatch";
import Watched from "./Watched";
import { setResults, setToWatch, setWatched } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks.ts";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // use local state to determine if search content is loaded
  const [searchLoaded, setSearchLoaded] = useState(false);

  // handle searching
  const handleClick = async (e: any) => {
    e.preventDefault();
    const title: string = e.target[0].value;
    const body = JSON.stringify({ title: title });
    // submit fetch request for movies
    const response = await fetch("/movies", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: body,
    });
    const movies = await response.json();
    // update state with the searched movies
    // console.log("Movies obtained, dispatching!");
    await dispatch(setResults(movies));
    // console.log("Setting searchLoaded to true");
    setSearchLoaded(true);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="search" placeholder="Search...." />
        <button type="submit">Search</button>
      </form>
      {searchLoaded ? <Searched /> : <div></div>}
      <ToWatch />
      <Watched />
    </>
  );
};

export default Dashboard;
