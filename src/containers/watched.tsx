import React from "react";
import MovieBox from "../components/movieBox.tsx";

const Watched = ({ watchedList }) => {
  const moviesWatched = [];

  for (let movie of watchedList) {
    moviesWatched.push(
      <MovieBox
        overview={movie.overview}
        title={movie.title}
        release_date={movie.release_date}
        poster={movie.poster}
        buttonText={"Leave a Rating"}
      />
    );
  }

  return <div className="watched">{moviesWatched}</div>;
};

export default Watched;
