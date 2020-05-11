import React, { useState, useEffect} from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import AuthContext from './../auth/AuthContext';
import './MovieCard.css';

function MovieList() {
    const[userName, setUserName] = useState('');
    let [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    async function getMovies() {
        const res = await axios('http://localhost:3200/movies/');
        setMovies(res.data)
    }

    return (
        <AuthContext.Provider value={{ userName, setUserName }}>
            <div className="page_wrapper">
                <h1>Lord of the Rings Series</h1>
                <div className="wrapper_movies">
                    {movies.map(movie => <MovieCard film={movie} key={movie.id} />)}
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default MovieList;
