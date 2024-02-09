import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
import "./App.css"
import UserPosts from './components/UserPosts/UserPosts';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import NewPassword from './components/NewPassword/NewPassword';


const user = JSON.parse(localStorage.getItem('user'))
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={user? <Navigate to={"/"} />:<Auth />} />
        <Route path='/reset-password' element={user? <Navigate to={"/"} />:<ForgotPassword />} />
        <Route path='/new-password' element={user? <Navigate to={"/"} />:<NewPassword />} />
        <Route element={<Layout />}  >
          <Route path='/' element={user ? <Home /> : <Navigate to={"/auth"} />}/>
          <Route path='/user' element={user ? <UserPosts /> : <Navigate to={"/auth"} />}/>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
