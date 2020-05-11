import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import AuthContext from './../auth/AuthContext';

function Books() {
    const [userName, setUserName] = useState('');
    let [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    async function getBooks() {
        const res = await axios('http://localhost:3200/books/');
        setBooks(res.data)
    }

    return (
        <AuthContext.Provider value={{ userName, setUserName }}>
            <div className="page_wrapper">
                <h1>Lord of the Rings Series Books</h1>
                <div className="wrapper_movies">
                    {books.map(book => <BookCard story={book} key={book.id} />)}
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default Books;
