import React from "react";
import RegisterForm from "../components/auth/registerForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
   const nav = useNavigate()
   const dispatch = useDispatch()
   const [match, setMatch] = useState(true)
   console.log("Register")

  const handleRegister = (e, formdata) => {
    event.preventDefault();
    if (formdata.password === formdata.confirmPassword) {
      console.log("handleRegister formdata: ", formdata.password)
      axios.post("/api/register", formdata)
      .then((res) => {
         if (res.data.success) {
            dispatch({
               type: "USER_LOGIN"
            })
            console.log("res.data: ", res.data)
            nav('/')
         } else {
            console.log("Registration failed")
         }
      });

    } else {
      setMatch(false)
      console.log('Passwords do not match')
    }
  };

  return (
   match ? (
      <>
         <div className="flex flex-col items-center">
            <div className="font-bold text-2xl my-3">Register</div>
            <RegisterForm onRegister={handleRegister} />
         </div>
         
      </>
   ) : (
      <>
      <div className="flex flex-col items-center">
         <div className="font-bold text-2xl my-3">Register</div>
         <RegisterForm className="m-2" onRegister={handleRegister} />
         <div className="m-2">The Passwords don't match</div>
      </div>
         
      </>
   )
  );
};

export default Register;
