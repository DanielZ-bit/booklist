import axios from "axios"
import { useAuthContext } from '../hooks/useAuthContext';
import { useBookContext } from "../hooks/useBooksContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookDetails = ({data}) =>{
    const {dispatch} = useBookContext();
    const { user } = useAuthContext();

    const [values, setValues]= useState(
        {
            Status: data.Status,
            Rating: data.Rating
        }
    )
    const id= data._id
    
    const handleDelete = async() =>{
    
        const response = await axios.delete(`https://justit-books-589e0cbb7adc.herokuapp.com/api/v1/books/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
               }
            }
         )
         if (response){   
             dispatch({type: 'BOOK_DELETE', payload: id})
         }
         else{
             console.log("no response");
         }
         
    }
    const handleUpdate = async(e) =>{
        e.preventDefault();
        const response = await axios.patch(`https://justit-books-589e0cbb7adc.herokuapp.com/api/v1/books/${id}`,values,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
               }
            }
         )
         if (response){   
             dispatch({type: 'BOOK_UPDATE', payload: id})
         }
         else{
             console.log("no response");
         }

    }
    return(
    <div className="book-details">
        Title: <Link to={ `/book/${data._id}`}state = {{data}}>{data.Book}</Link>
        <form onSubmit={handleUpdate}>
            <label>Status</label>
        <select 
            value={values.Status}
            onChange={(e) => setValues({ ...values, Status: e.target.value })}>
                <option value="Not Started">Not Started</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Finished">Finished</option>       
        </select>
        <label>rating</label>
        <input 
                type="Number" 
                value={data.Rating} 
                onChange={(e) => setValues({ ...values, Rating: e.target.value })} 
        />
            <button type ="submit">update</button>
        </form>
        <button onClick={handleDelete}>Delete</button>
    </div>
    )
}

export default BookDetails