import React from 'react'
import Home from './Pages/Home/Home'
import SignUp from "./Pages/SignUp/SignUp"
import Login from "./Pages/Login/Login"
import {Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { useAuthContext } from './Context/AuthContex'

const App = () => {
  const {authUser} = useAuthContext();

  console.log("authUser:", JSON.stringify(authUser, null, 2));


  return (
    <div className="p-4 h-screen flex items-center justify-center">

        <Routes>

          <Route 
          path='/' 
          element={authUser ? <Home/> : <Navigate to={"/login"} /> }
           />

          <Route
           path='/signup'
          element={authUser ? <Navigate to={"/"} /> : <SignUp/>} 
          />

          <Route path='/login'
           element={authUser ? <Navigate to={"/"} /> : <Login/>} 
           />

        </Routes>

        <Toaster/>
    </div>
  )
}

export default App