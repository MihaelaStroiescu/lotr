import React, { useState, useEffect} from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import AuthContext from './../auth/AuthContext';

function MovieList() {
    const[userName, setUserName] = useState('');
    console.log(userName);

    let [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    async function getMovies() {
        const res = await axios('http://localhost:3200/movies/');
        console.log(res.data)
        setMovies(res.data)
    }

    return (
        <AuthContext.Provider value={{ userName, setUserName }}>
        <div className="row">
            <h1>Welcome</h1>
            {movies.map(movie => <MovieCard film={movie} key={movie.id} />)}
        </div>
        </AuthContext.Provider>
    );
}

export default MovieList;
