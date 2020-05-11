import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Books from './components/books/Books';
import BookDetails from './components/books/BookDetails';
import EditBook from './components/books/EditBook';
import Movies from './components/movies/Movies';
import MovieDetails from './components/movies/MovieDetails';
import EditMovie from './components/movies/EditMovie';
import Header from './components/header/Header';
import Home from './Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthContext from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';


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
    <>
    <AuthContext.Provider value={{userName, setUserName}}>
    <BrowserRouter>
      <Header />
      <div style={{height:'100%'}} className="container">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/books/">
          <Books />
        </Route>
        <Route exact path="/books/:booksId">
          <BookDetails />
        </Route>
            <PrivateRoute path="/books/edit/:bookId">
              <EditBook />
            </PrivateRoute>
        <Route exact path="/movies/">
          <Movies />
        </Route>
        <Route exact path="/movies/:moviesId">
          <MovieDetails />
        </Route>
          <PrivateRoute path="/movies/edit/:movieId">
            <EditMovie />
          </PrivateRoute>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </div>
    </BrowserRouter>
    </AuthContext.Provider>

</>

  );
}

export default App;
