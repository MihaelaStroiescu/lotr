import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditBook() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    async function getBookById(id) {
        try {
            const res = await axios('http://localhost:3200/books/' + id);
            setBook(res.data);
            console.log(setBook)
        } catch (e) {
            console.warn(e);
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        try {
            const resp = axios.put('http://localhost:3200/books/' + bookId, { 'Image': book.image }).then(resp => { console.log(resp.data) })
        } catch (e) {
            console.warn(e)
        }
    }

    function handleInputChange(e) {
        setBook({ ...book, Image: e.currentTarget.value });
    }

    useEffect(() => {
        getBookById(bookId);
    }, [bookId])

    if (!book) {
        return <h1>Loading ...</h1>;
    }

    return (
        <div>
            <>
                <h1>Edit Book {book.name}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="image">Update Image</label>
                        <input
                            onChange={handleInputChange}
                            value={book.image}
                            type="text"
                            className={'form-control'}
                            id="image"
                            placeholder="change image"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </>

        </div>
    )
}

export default EditBook;
