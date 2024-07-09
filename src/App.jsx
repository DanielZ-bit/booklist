import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Login from './pages/login'
import SignUp from './pages/signup'
import Navbar from './components/navbar'
import Home from './pages/home'
import Books from './pages/book'
import './index.css'

function App() {
  const{user} = useAuthContext();
  return (
    <div className='App'>

   <BrowserRouter>
   <div className='pages'>
   <Navbar/>
    <Routes>
      <Route
        path = '/'
        element = {user? <Home/>: <Navigate to="/login"/>}
      />
      <Route 
        path = '/login'
        element= {!user?<Login/>: <Navigate to ="/"/>}
      />
      <Route 
        path = '/signup'
        element= {!user?<SignUp/>: <Navigate to ="/"/>}
      />
      <Route
      path='/book/:id'
      element = {user? <Books/>: <Navigate to="/login"/>}
      >
      </Route>
    </Routes>
    </div>
   </BrowserRouter>
   </div>
  )
}

export default App
