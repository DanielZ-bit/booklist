import {AuthContext} from '../context/authcontext'
import {useContext} from 'react';

export const useAuthContext = ()=>{
	const context = useContext(AuthContext);
	if (!context){
		throw Error("useAuthcontext must be used within authcontextprovider")
	}
	return context;
}
