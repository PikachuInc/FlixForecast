import React from "react";

type movieBoxProps = {
  title: string;
  release_date: string;
  overview: string;
  poster: string;
};

const MovieBox = (props: movieBoxProps) => {
  console.log("Rendering movieBox");
  console.log("props: ", props);
  console.log(`https://image.tmdb.org/t/p/w500${props.props.poster}`);

  return (
    <div className="card">
      <h3>{props.props.title}</h3>
      <p>{props.props.release_date}</p>
      <p>{props.props.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${props.props.poster}`}></img>
    </div>
  );
};

export default MovieBox;
