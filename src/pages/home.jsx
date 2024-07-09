import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useBookContext } from "../hooks/useBooksContext";
import BookDetails from '../components/bookdetails';
import "../index.css";
import BookForm from "../components/bookform";

const Home = () => {
    const { user } = useAuthContext();
    const { books, dispatch } = useBookContext();
    
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("https://justit-books-589e0cbb7adc.herokuapp.com/api/v1/books", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (response.data) {
                    dispatch({ type: "SET_BOOKS", payload: response.data.getbooks });
                }
            } catch (err) {
                console.error("Failed to fetch books", err);
            }
        };
        
        if (user) {
            fetchBooks();
        }
    }, [dispatch, user]);
    return (
        <div>
            {books && books.map((book) => (
                <BookDetails key={book._id} data={book} />
            ))}
            <BookForm />
        </div>
    );
};

export default Home;
