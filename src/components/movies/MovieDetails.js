import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import Characters from './Characters';
import './MovieDetails.css';


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
            <div className="movieDetails_wraper">
                <div className="page_row">
                    <div className="media_wrapper">
                        <div className="media">
                            <h1>{movie.name}</h1>
                            <div className="movie_poster">
                                <img src={movie.poster} alt="Unexpected Journey" />
                            </div>
                            {userName || localStorage.userName ?
                                <Link className="btn_edit" to={"/movies/edit/" + movie.id}>Edit This Movie</Link>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="content_wrapper">
                        <div className="content">
                            <h2>Details about movie</h2>
                            <p>Runtime: {movie.runtimeInMinutes}</p>
                            <p>Academy Award Nominations: {movie.academyAwardNominations}</p>
                            <p>Academy Award Wins: {movie.academyAwardWins}</p>
                        </div>
                    </div>
                </div>

                    <div className="page_row characters">
                    <h3>Main Characters</h3>
                    {char.map(pers => <Characters pers={pers} key={pers.id} />)}
                </div>
            </div>
            </>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;
