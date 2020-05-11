import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ film }) {

    return (
        <div className="movie_wraper">
            <div className="movie_card">
                <img className="movie_card_img" src={film.poster} alt="Movie Poster" />
                <div className="movie_card_body">
                    <h5>{film.name}</h5>
                    <p className="movie_card_text">
                        Duration: {film.runtimeInMinutes}
                    </p>
                    <Link to={'/movies/' + film.id} className="btn_movie_edit">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
