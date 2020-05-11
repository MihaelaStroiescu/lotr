import React from 'react';
import './MovieDetails.css';

function Characters({pers}) {
    return (
        <>
        <div className="characters_wrapper">
            <h4>{pers.name}</h4>
            <div>
                <img className="character_poster" src={pers.image} alt="Movie Poster" />
                <div className="character_description">
                    <p>Gender: {pers.gender}</p>
                    <p>Race: {pers.race}</p>
                    <p>More info: {pers.wikiUrl}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Characters
