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
                <h1>{book.name}</h1>
                <div>
                    <img src={book.image} width="50%" alt="" />
                </div>

                {userName || localStorage.userName ?
                    <Link className="btn btn-primary" to={"/books/edit/" + book.id}>Edit This Book</Link>
                    :
                    null
                }
            </>


        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default BookDetails;
