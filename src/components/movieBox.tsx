import React from "react";

type movieBoxProps = {
  title: string;
  release_date: string;
  overview: string;
  poster: string;
};

const MovieBox = (props: movieBoxProps) => {
  // console.log("Rendering movieBox");
  // console.log("props: ", props);
  // console.log(`https://image.tmdb.org/t/p/w500${props.props.poster}`);

  return (
    <div className="card">
      <div className="words">      
        <h3>{props.props.title}</h3>
        <p>{props.props.release_date}</p>
        <div className="overview"> <p>{props.props.overview}</p> </div>
      </div>
      <img src={`https://image.tmdb.org/t/p/w500${props.props.poster}`}></img>
    </div>
  );
};

export default MovieBox;
