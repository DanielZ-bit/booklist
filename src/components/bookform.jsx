import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { useBookContext } from "../hooks/useBooksContext";
import '../index.css'

const BookForm = () =>{
    const {dispatch} = useBookContext();
    const { user } = useAuthContext()
    const token = user.token;
    const [values, setValues]= useState(
        {
            Book: '',
            Status: 'Not Started',
            Rating: ''
        }
    )
    const [isFormVisible, setFormVisible] = useState(false);
    const [error, setError] = useState(null);
    const handleForm = async(e) =>{
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
          }
          try {
        const createbook = await axios.post("https://justit-books-589e0cbb7adc.herokuapp.com/api/v1/books", values, { headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})
        setFormVisible(!isFormVisible);
        if (createbook.data){
        setValues({
            Book: '',
            Status: 'Not Started',
            Rating: ''
        })
        dispatch({type: "CREATE_BOOKS", payload: createbook.data})
        return createbook
         }
        }
        catch(err){
            console.error(err);
            setError('Failed to create book');
        }
        

    }
        
    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };
    return(
        <div>
            <button onClick={toggleFormVisibility}>Add Book</button>
                
            {isFormVisible && (
                <form onSubmit={handleForm}>
                    <label>Book title</label>
                    <input 
                        type="text" 
                        value={values.Book} 
                        onChange={(e) => setValues({ ...values, Book: e.target.value })} 
                    />
                    
                    <label>Status</label>
                    <select 
                        value={values.Status} 
                        onChange={(e) => setValues({ ...values, Status: e.target.value })}
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Finished">Finished</option>       
                    </select>
                    
                    <label>Rating</label>
                    <input 
                        type="Number" 
                        value={values.Rating} 
                        onChange={(e) => setValues({ ...values, Rating: e.target.value })} 
                    />
                    
                    <button type="submit">Submit</button>
                    {error && <div className = "error">{error}</div> }
                </form>
            )}
        </div>
    );
};
export default BookForm