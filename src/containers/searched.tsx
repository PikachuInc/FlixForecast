import React, { useEffect } from "react";
import { useAppSelector } from "../hooks.ts";
import { selectMovieState } from "../features/movieSlice";
import MovieBox from "../components/movieBox.tsx";

const Searched = () => {
  // gain access to state to see the searched for movies
  const movieState = useAppSelector(selectMovieState);
  const searchResults = movieState.searchResults;

  // console.log("searchResults:", searchResults);
  //   useEffect(() => {
  //     console.log("Searched component rendered");
  //   }, [searchResults]);

  const moviesSearched: any[] = [];
  
  for (let i = 0; i < 6; i++) {
    if (searchResults[i].poster) {
      moviesSearched.push(<MovieBox key={i} props={searchResults[i]} />)
    }
  }

  return <div className="searched">{moviesSearched}</div>;
};

export default Searched;
