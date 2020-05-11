import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import './../movies/MovieDetails.css';

function EditBook() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    async function getMovieById(id) {
        try {
            const res = await axios('http://localhost:3200/books/' + id);
            setBook(res.data);
        } catch (e) {
            console.warn(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            axios.put('http://localhost:3200/books/' + bookId, {
                'name': book.name,
                'image': book.image
            }).then(resp => { console.log(resp.data) })
            setRedirect(true)
        } catch (e) {
            console.warn(e)
        }

    }
    const [redirect, setRedirect] = useState(false)

    function handleInputChange(e) {
        setBook({ ...book, image: e.currentTarget.value });
    }

    useEffect(() => {
        getMovieById(bookId);
    }, [bookId])

    if (!book) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            <div className="edit">
                <h1>Edit Image for "{book.name}"</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newimage">Change Image</label>
                        <input
                            onChange={handleInputChange}
                            value={book.image}
                            type="text"
                            className={'form-control'}
                            id="newimage"
                            placeholder="upload your url"
                        />
                    </div>
                    <button type="submit" className="btn_edit">Save</button>
                </form>
                {(redirect ?
                    <Redirect to="/books" />
                    : null
                )}
            </div>
        </>
    )
}

export default EditBook;
