import { booksContext } from "../context/booksContext";
import { useContext } from "react";

export const useBookContext = ()=>{
    const context = useContext(booksContext)

    if(!context){
        throw Error("usebookscontext must be used inside the provider")
    }
    return context;
}