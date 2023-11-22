import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks';
import { Router, Route, Routes } from 'react-router';
import Dashboard from './containers/Dashboard';
import LogInSignUp from './containers/logInSignUp';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();
  const loggedIn: boolean = useAppSelector((state) => state.users.loggedIn);
  
  return (
    <Routes>
      <Route path="/" element={!loggedIn && <LogInSignUp />} />
      <Route path="/" element={loggedIn && <Dashboard />} />
    </Routes>
  )
}

export default App
