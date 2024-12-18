import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './Context/AuthContex'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
