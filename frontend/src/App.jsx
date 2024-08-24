import React from 'react'
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/home/home'
import Header from './components/header/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'



const App = () => {
  return <>
  
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path = "/" element={<Home/>} />
    <Route path = "/login" element={<Login/>} />
    <Route path = "/register" element={<Register/>} />
    <Route path = "/verify" element={<Verify/>} />
  </Routes>
  </BrowserRouter>
  </>
}

export default App
