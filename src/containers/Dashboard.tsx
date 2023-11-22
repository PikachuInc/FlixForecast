import React from "react";
import Searched from './Searched';
import ToWatch from "./ToWatch";
import Watched from './Watched';

const Dashboard = () => {
  const handleClick = (e: any) => {
    const searchString = e.target[0].value
    fetch('/movies', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: searchString,
    })
  }
  return (
    <>
      <h1>Dashboard</h1>
      <form onSubmit={handleClick}>
        <input 
        type="text"
        name="search"
        placeholder="Search...."
        />
        <button type="submit">Search</button>
      </form>
      <Searched />
      <ToWatch />
      <Watched />
    </>
  )
}

export default Dashboard;