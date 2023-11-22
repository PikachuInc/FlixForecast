import React, { useState } from "react";
import {
  setResults,
  setOneToWatch,
  setOneWatched,
} from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks.ts";

type movieBoxProps = {
  title: string;
  release_date: string;
  overview: string;
  poster: string;
  buttonText: string;
};

const MovieBox = (props: movieBoxProps) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.users.userID);
  // use local state to store what type of button
  const [buttonInner, setButtonInner] = useState("Add to Watch List");
  // use local state to store movieID
  const [movieID, setMovieID] = useState(null);
  // handle button click to move between columns
  const handleClick = async (e: any) => {
    if (e.target.innerText === "Add to Watch List") {
      console.log("ADDING TO WATCH LIST");
      // add movie to watch list
      const body = JSON.stringify({ userID: userID, ...props });
      console.log("body: ");
      const response = await fetch("/myMovies", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: body,
      });
      const data = await response.json(); //{userID, movieID}
      if (response.status === 200) {
        setButtonInner("Add to Watched");
        setMovieID(data.movieID);
        dispatch(setOneToWatch(props));
      }
    } else if (e.target.innerText === "Add to Watched") {
      // add movie to watched
      const body = JSON.stringify({ userID, movieID, watched: true });
      const response = await fetch("/myMovies/watch", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: body,
      });
      // const data = await response.json(); //{userID, movieID, watched}
      if (response.status === 200) {
        setButtonInner("Leave a Rating");
        dispatch(setOneWatched(props));
      }
    } else {
      // leave a rating
      setButtonInner("Update Rating");
    }
  };

  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.release_date}</p>
      <p>{props.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${props.poster}`}></img>
      <button onClick={handleClick}>{props.buttonText}</button>
    </div>
  );
};

export default MovieBox;
