import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import AuthContext from './../auth/AuthContext';

function Books() {
    const [userName, setUserName] = useState('');
    console.log(userName);
    let [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    async function getBooks() {
        const res = await axios('http://localhost:3200/books/');
        console.log(res.data)
        setBooks(res.data)
    }

    return (
        <AuthContext.Provider value={{ userName, setUserName }}>
            <div className="row">
                <h1></h1>
                {books.map(book => <BookCard story={book} key={book.id} />)}
            </div>
        </AuthContext.Provider>
    );
}

export default Books;
