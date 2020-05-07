import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import Characters from './Characters';


function MovieDetails({ pers }) {
    const { userName } = useContext(AuthContext);
    const { moviesId } = useParams();
    const { charId } = useParams();
    const [movie, setMovie] = useState(null);
    const [char, setChar] = useState(null);

    async function getMovieById(id) {
        try {
            const res = await axios('http://localhost:3200/movies/' + id);
            setMovie(res.data);
            console.log('movies', res.data)
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        getMovieById(moviesId);
        getCharById(moviesId);
    }, [moviesId]);

    async function getCharById(id) {
        try {
            const links = await axios('http://localhost:3200/movie-characters?movieID=' + id).then(res => res.data);
            console.log('link:', links)
            const promises = links.map(link => axios.get('http://localhost:3200/characters/' + link.characterID).then(res => res.data));
            const characters = await Promise.all(promises);
            setChar(characters);
            console.log('characters', characters)
        } catch (e) {
            console.warn(e);
        }
    }

    if (movie && char) {
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
                <div className="row">
                    <h1> Main Characters</h1>
                    <div>
                        <p> {char.map(pers => <Characters pers={pers} key={pers.id} />)}</p>
                    </div>
                </div>
            </>


        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;
