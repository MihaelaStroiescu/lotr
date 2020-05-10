import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';


function BookDetails() {
    const { userName } = useContext(AuthContext);
    const { booksId } = useParams();
    const [book, setBook] = useState(null);

    async function getBookById(id) {
        try {
            const res = await axios('http://localhost:3200/books/' + id);
            setBook(res.data);
            console.log(res.data)
        } catch (e) {
            console.warn(e);
        }

    }

    useEffect(() => {
        getBookById(booksId);
    }, [booksId]);

    if (book) {
        return (
            <>
                <div className="edit">
                    <div className="preview_book">
                <h1>{book.name}</h1>
                    <div className="book_poster">
                    <img src={book.image} alt="Book Poster" />
                </div>

                {userName || localStorage.userName ?
                    <Link className="btn_edit" to={"/books/edit/" + book.id}>Edit This Book</Link>
                    :
                    null
                }
                    </div>
                </div>
            </>


        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default BookDetails;
