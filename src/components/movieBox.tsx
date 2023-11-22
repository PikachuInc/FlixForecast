import React from "react";

type movieBoxProps = {
  title: string,
  release_date: number,
  overview: string,
  poster: string,
}

const movieBox = (props: movieBoxProps) => {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.release_date}</p>
      <p>{props.overview}</p>
      <img src={props.poster}></img>
    </div>
  )
}

export default movieBox;