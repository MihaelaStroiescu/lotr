import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ story }) {
    console.log(story)

    return (
        <div className="col-md-4">
            <div className="card">
                <img className="card-img-top" src={story.image} alt="Book Poster" />
                <div className="card-body">
                    <h5 className="card-title">{story.name}</h5>
                    <Link to={'/books/' + story.id} className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
