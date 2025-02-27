import { useState } from "react"
import { useSignup } from "../hooks/useSignUp"
const SignUp = () =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error } = useSignup()

    const handleSubmit = async(e)=> {
        e.preventDefault();
        await signup(name, email, password);
        
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Name: </label>
            <input type="text" onChange={(e)=> setName(e.target.value)}value={name}></input>
            <label>Email: </label>
            <input type="email" onChange={(e)=> setEmail(e.target.value)}value={email}></input>
            <label>Password: </label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)}value={password}></input>
            <button disabled= {isLoading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default SignUp