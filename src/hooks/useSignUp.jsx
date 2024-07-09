import { useState } from "react";
import {useAuthContext} from './useAuthContext'
import axios from 'axios';

export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async(name, email, password) => {
        setisLoading(true);
        setError(null);
        try {
            const response = await axios.post(
              "https://justit-books-589e0cbb7adc.herokuapp.com/api/v1/auth/register",
              { name, email, password },
              { headers: { 'Content-Type': 'application/json' } }
            );
      
            // Assuming the response contains a user object and token
            if (response.data) {
              // Update the AuthContext with the new user
              dispatch({ type: 'LOGIN', payload: response.data });
                localStorage.setItem('user', JSON.stringify(response.data))
              setisLoading(false);
            }
          } catch (err) {
            setError(err.response ? err.response.data.msg : 'Signup failed');
            setisLoading(false);
          }
        }
        return {signup, isLoading, error}
    }