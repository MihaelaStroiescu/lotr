import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditMovie() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        try {
            const res = await axios('http://localhost:3200/movies/' + id);
            setMovie(res.data);
        } catch (e) {
            console.warn(e);
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        try {
            const  resp = axios.put('http://localhost:3200/movies/' + movieId, {'Time':movie.runtimeInMinutesred}).then(resp => {console.log(resp.data)})
        } catch(e) {
            console.warn(e)
        }
    }

    function handleInputChange(e){
        setMovie({ ...movie, Time: e.currentTarget.value });
    }

    useEffect(() => {
        getMovieById(movieId);
    }, [movieId]);

    if (!movie) {
        return <h1>Loading ...</h1>;
    }
    return (
        <div>
            <>
                <h1>Edit Movie {movie.name}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="runtimeInMinutes">Time</label>
                        <input
                            onChange={handleInputChange}
                            value={movie.runtimeInMinutes}
                            type="text"
                            className={'form-control'}
                            id="runtimeInMinutes"
                            placeholder="run time in minutes"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </>

        </div>
    )
}

export default EditMovie;
