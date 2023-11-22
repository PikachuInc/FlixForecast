import React, { useEffect } from "react";
import { useAppSelector } from "../hooks.ts";
import { selectMovieState } from "../features/movieSlice";
import MovieBox from "../components/movieBox.tsx";

const Searched = () => {
  // gain access to state to see the searched for movies
  const movieState = useAppSelector(selectMovieState);
  const searchResults = movieState.searchResults;

  console.log("searchResults:", searchResults);
  //   useEffect(() => {
  //     console.log("Searched component rendered");
  //   }, [searchResults]);

  const moviesSearched = searchResults.map((movie, index) => (
    <MovieBox key={index} props={movie} />
  ));

  return <div className="searched">{moviesSearched}</div>;
};

export default Searched;
