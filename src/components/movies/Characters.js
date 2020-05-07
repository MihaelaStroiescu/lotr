import React from 'react';

function Characters({pers}) {
    console.log(pers)

    return (

            <div className="card">
                <div className="card-body">
                <img className="card-img" src={pers.image} alt="Movie Poster" />
                    <p className="card-title">{pers.name}</p>
                    <p className="card-text">
                        Gender: {pers.gender}
                    </p>
                    <p>Race: {pers.race}</p>
                    <p>More info: {pers.wikiUrl}</p>
                    {/* <Link to={'/movies/' + film.id} className="btn btn-primary">Details</Link> */}
                </div>
            </div>

    );

};

export default Characters
