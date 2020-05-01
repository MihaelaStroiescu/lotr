import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';


function MovieDetails() {

    const { userName } = useContext(AuthContext);
    const { movies_id } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        try {
            const res = await axios(`http://localhost:3200/movies/${id}`);
            setMovie(res.data);
            console.log(res.data)
        } catch (e) {
            console.warn(e);
        }

    }

    useEffect(() => {
        getMovieById(movies_id);
    }, [movies_id]);

    if (movie) {
        console.log(movie);
        return (
            <>
                <h1>{movie.name}</h1>
                <div>{movie.poster}</div>
                    {userName ?
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
