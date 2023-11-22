import React from "react";
import MovieBox from "../components/movieBox.tsx";

const ToWatch = ({ toWatchList }) => {
  const moviesToWatch = [];

  for (let movie of toWatchList) {
    moviesToWatch.push(
      <MovieBox
        overview={movie.overview}
        title={movie.title}
        release_date={movie.release_date}
        poster={movie.poster}
        buttonText={"Add to Watched"}
      />
    );
  }

  return <div className="to-watch">{moviesToWatch}</div>;
};

export default ToWatch;
