import React from "react";
import { useState } from "react";
import { useLoaderData, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LoginForm from "../components/auth/LoginForm";


const Auth = () => {
  const nav = useNavigate()
  // const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const dispatch = useDispatch()


  const handleLogin = async (e, formdata) => {
    event.preventDefault()

    const res = await axios.post("/api/auth", formdata)

    if (res.data.success) {
      dispatch({
        type: 'USER_LOGIN'
      })
      nav('/')
    }
  }
    
  return (
    <>
      <div className="flex flex-col items-center my-3">
        <LoginForm onLogin={handleLogin} />
        <br/>
        <h2 className="my-3">Don't have an account?</h2> 
        <NavLink to="./register" className='text-blue-dark my-3'>Register Here</NavLink>
      </div>
    </>
  );
};


export default Auth
