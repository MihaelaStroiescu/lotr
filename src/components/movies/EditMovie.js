import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

function EditMovie() {
    const { movieId } = useParams();
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

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        try {
            axios.put('http://localhost:3200/movies/' + movieId, movie).then(resp => {console.log(resp.data)})
            setRedirect(true)
        } catch(e) {
            console.warn(e)
        }

    }
    const [redirect, setRedirect] = useState(false)


    function handleInputChange(e){
        setMovie({ ...movie, poster: e.currentTarget.value });
    }

    useEffect(() => {
        getMovieById(movieId);
    }, [movieId])

    if (!movie) {
        return <h1>Loading ...</h1>;
    }

    return (
            <>
                <div className="edit">
                <h1>Edit Image for "{movie.name}"</h1>
                <form onSubmit={handleSubmit}>
                        <div className="form-group ">
                        <label htmlFor="newimage">Change Image</label>
                        <input
                            onChange={handleInputChange}
                            value={movie.poster}
                            type="text"
                            className={'form-control'}
                            id="newimage"
                            placeholder="upload your url"
                        />
                    </div>
                    <button type="submit" className="btn_edit">Save</button>
                </form>
                {(redirect ?
                <Redirect to="/movies" />
                : null
                    )}
                </div>
            </>
    )
}

export default EditMovie;
