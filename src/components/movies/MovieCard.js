import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ film }) {
    console.log(film)

    return (
        <div className="col-md-4">
            <div className="card">
                <img className="card-img-top" src={film.poster} alt="Movie Poster" />
                <div className="card-body">
                    <h5 className="card-title">{film.name}</h5>
                    <p className="card-text">
                        Duration: {film.runtimeInMinutes}
                    </p>
                    <Link to={'/movies/' + film.id} className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
