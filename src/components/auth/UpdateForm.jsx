import React from 'react'
import { useState } from 'react';

const UpdateForm = ({ onUpdate, userId }) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
  return (
    <>
      <form
      className="flex flex-col items-center justify-center"
      onSubmit={(e) => {
        console.log("Above onRegister")
        onUpdate(e, {
            email: emailValue,
            password: passwordValue,
            confirmPassword: confirmPassword
            // confirmPassword: confirmPassword,
          });
          console.log('UpdateForm test')
        }}
      >
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="email">Email: </label>
          <input
            name="newEmail"
            id="email"
            type="email"
            onChange={(e) => setEmailValue(e.target.value)}
            className="loginFormInput"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="newPassword">Password: </label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
            className="loginFormInput"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="ConfirmPassword">Confirm Password: </label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="loginFormInput"
          />
        </div>
      <button type="submit" className="navButton m-3 hover:bg-slate-400 hover:text-primary-dark flex flex-col items-center justify-center bg-slate-300 shadow-md">
        Submit
      </button>
      </form>
    </>
  )
}

export default UpdateForm