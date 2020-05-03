import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';


function MovieDetails() {
    const { userName } = useContext(AuthContext);
    const { moviesId } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        try {
            const res = await axios('http://localhost:3200/movies/' + id);
            setMovie(res.data);
            console.log(res.data)
        } catch (e) {
            console.warn(e);
        }

    }

    useEffect(() => {
        getMovieById(moviesId);
    }, [moviesId]);

    if (movie) {
        return (
            <>
                <h1>{movie.name}</h1>
                <div>
                    <img src={movie.poster} width="50%" alt=""/>
                </div>

                {userName || localStorage.userName ?
                        <Link className="btn btn-primary" to={"/movies/edit/" + movie.id}>Edit This Movie</Link>
                        :
                        null
                    }
            </>


        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;
