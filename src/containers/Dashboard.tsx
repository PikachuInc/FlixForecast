import React, { useState, useEffect } from "react";
import Searched from "./Searched";
import ToWatch from "./ToWatch";
import Watched from "./Watched";
import { setResults, setToWatch, setWatched } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks.ts";
import { useNavigate } from "react-router";
import { RootState } from "../store.ts";

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

  const { userID, toWatchList, watchedList } = useAppSelector(
    (state: RootState) => ({
      userID: state.users.userID,
      toWatchList: state.movies.toWatchList,
      watchedList: state.movies.watchedList,
    })
  );

  useEffect(() => {
    const fetchMyMovies = async () => {
      const response = await fetch(`/myMovies?${userID}`);
      const data = await response.json();
      const newToWatchList = data.toWatchList;
      const newWatchedList = data.watchedList;
      dispatch(setToWatch(newToWatchList));
      dispatch(setWatched(newWatchedList));
    };

    fetchMyMovies();
  }, [userID, dispatch]);

  return (
    <>
      <h1>Dashboard</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="search" placeholder="Search...." />
        <button type="submit">Search</button>
      </form>
      {searchLoaded ? <Searched /> : <div></div>}
      <ToWatch toWatchList={toWatchList} />
      <Watched watchedList={watchedList} />
    </>
  );
};

export default Dashboard;
