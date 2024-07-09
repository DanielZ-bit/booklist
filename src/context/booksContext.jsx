import { createContext, useReducer } from "react";

export const booksContext = createContext();

export const booksReducer = (state, action) =>{
    switch(action.type){
        case 'SET_BOOKS': 
            return{     
                books: action.payload 
            }
        case 'CREATE_BOOKS':
            return{  
                books: [action.payload, ...state.books]
            }
            case 'BOOK_DELETE':
                return {
                    books: state.books.filter(book => book._id !== action.payload)
                }
            case 'BOOK_UPDATE':
                return {
                     books: state.books.map((b) => b._id === action.payload._id ? action.payload : b)
                };
        default:
            state
        }
}

export const BooksProvider = ({children}) => {
    const [state, dispatch] = useReducer(booksReducer, {books: null});
    

    return(
        <booksContext.Provider value = {{...state, dispatch}}>
            {children}
        </booksContext.Provider>
    )   
}