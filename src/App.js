import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Movies from './components/movies/Movies';
import MovieDetails from './components/movies/MovieDetails';
import EditMovie from './components/movies/EditMovie';
import Header from './components/header/Header';
import Home from './Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AutoContext from './components/auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';

async function getMovies() {
  const res = await axios('http://localhost:3200/movies');
  console.log(res.data);
}

function App() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // verificam daca in localStorageavem userName. Daca avem setam setUserName(ce vine din LocalStorage)
    const username = localStorage.getItem('userName');
    if (username) {
      setUserName(userName);
    }
  }, [userName]);

  return (
    <AutoContext.Provider value={{userName, setUserName}}>
    <BrowserRouter>
      <Header />
      <div style={{height:'100%'}} className="container">
        <Route exact path="/">
            <Home></Home>
        </Route>
        <Route exact path="/movies/">
          <Movies>{getMovies}</Movies>
        </Route>
          <Route exact path="/movies/:moviesId">
            <MovieDetails />
          </Route>
          <Route exact path="/movies/edit/:moviesId">
            <EditMovie></EditMovie>
          </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>

      </div>
    </BrowserRouter>
    </AutoContext.Provider>
  );
}

export default App;
