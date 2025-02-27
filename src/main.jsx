import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/authcontext'
import { BooksProvider } from './context/booksContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <BooksProvider>
            <App />
            </BooksProvider>
        </AuthProvider>
  </React.StrictMode>,
)
