import React from 'react';
import { Link } from 'react-router-dom';
import './../movies/MovieCard.css';

function BookCard({ story }) {

    return (
        <div className="movie_wraper">
            <div className="movie_card">
                <img className="movie_card_img" src={story.image} alt="Book Poster" />
                <div className="movie_card_body">
                    <h5 className="movie_card_text">{story.name}</h5>
                    <Link to={'/books/' + story.id} className="btn_movie_edit">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
