import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../index.css'
axios
const Books = () =>{
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const location = useLocation()
    const {data} = location.state
    const BookTitle = data.Book;
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/search.json?title="${BookTitle}"&lang=eng&limit=1`);
                setBooks(response.data.docs); 
                
                
            } catch (err) {
                console.error("Error fetching books:", err);
                setError("Error fetching books. Please try again later.");
            }
        };

        fetchBooks();
    }, [BookTitle]); 
    
    return(
        <div className="bookBody">
            <h2>Books</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <div className="book-container">
                        <strong className="book-title">Title: {book.title}</strong><br />
                        <strong className="book-author">{book.author_name}</strong><br />
                        <img className="book-cover" src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`} alt="Book cover" /><br />
                        <Link className="book-link" to={`https://www.goodreads.com/book/show/${book.id_goodreads[0]}`} target="_blank">Goodreads link</Link><br />
                        <span className="book-genre">Genre: <strong>{book.subject.slice(0, 5).join(', ')}</strong></span><br />
                        <span className="book-time-period">Time Period: <strong>{book.time}</strong></span><br />
                        <span className="book-rating">Average Rating: <strong>{book.ratings_average}</strong></span><br />
                        </div>
                    </li>
                ))}
            </ul>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Books;